# Authentification, tel que construit

Comment marche l'auth par paire de clés (façon portefeuille Bitcoin), **ce qui est protégé et ce qui ne l'est pas**, et ce qui reste à durcir. Écrit pour qu'une session future n'ait pas à re-deviner le compromis de sécurité. Source de vérité fonctionnelle : le CDC (`cdc-authentification-bitcoin-decoded`, v1.5). Ce fichier décrit l'**existant**.

L'idée : l'utilisateur détient une clé (12 mots), le serveur ne stocke **aucune donnée personnelle** (ni mail, ni mot de passe), et le retour sur l'app ne demande rien tant que la session est valide.

---

## Le modèle en un coup d'œil

Trois secrets, trois rôles distincts, à ne jamais confondre :

| Secret | Rôle | Perte = |
| --- | --- | --- |
| **Les 12 mots** (BIP39) | source de vérité unique ; dérivent la clé privée = l'identité (clé publique) | compte perdu (sauf copie d'accès + mot de passe) |
| **Le mot de passe** | chiffre les 12 mots dans IndexedDB **et** dans la copie d'accès (`.bdw`) | récupérable via les 12 mots (→ nouveau mot de passe) |
| **Le cookie de session** | confort (30 j) : l'app s'ouvre sans rien demander | mot de passe redemandé |

Chaîne de dérivation : `12 mots → HKDF-SHA256 (domaine "bitcoin-decoded-auth-v1") → clé privée secp256k1 → clé publique x-only = identifiant de compte`. Domaine séparé : une clé Bitcoin.Decoded **ne peut jamais** correspondre à une adresse d'un portefeuille standard.

Deux parcours de récupération, à ne pas confondre :

- **Saisir les 12 mots** (`restore.seed`) : sans mot de passe, on redéfinit un nouveau mot de passe. C'est la vraie récupération.
- **Importer la copie d'accès** (`.bdw`) : le fichier est chiffré **avec le mot de passe**, donc l'import **l'exige**. Un mot de passe oublié rend le fichier inutile — d'où le lien « Je n'ai plus mon mot de passe » au mur du mot de passe, qui renvoie vers les 12 mots.

---

## Périmètre de sécurité (§11 du CDC — à garder lisible dans six mois)

**Ce qui est protégé**

- La copie d'accès (`.bdw`) volée sans le mot de passe : illisible (AES-256-GCM, PBKDF2 600k).
- Le contenu d'IndexedDB copié sans le mot de passe : illisible.
- Le serveur compromis : aucune phrase de récupération, aucun mot de passe, aucune donnée personnelle à voler. Au pire, une liste de pseudos et de progressions.

**Ce qui n'est PAS protégé, et c'est assumé**

- Une session ouverte sur un appareil déverrouillé : accès complet au compte sans mot de passe. C'est le prix de la décision D3 (le mot de passe protège le **stockage**, pas la **session**).
- Une faille XSS : un script injecté peut lire la clé privée en mémoire pendant une session déverrouillée. Mitigation : **CSP stricte** (cf. plus bas), aucun `dangerouslySetInnerHTML` sur du contenu non maîtrisé.
- Un enregistreur de frappe sur l'appareil de l'utilisateur.

**Vocabulaire imposé** (code, commentaires, interface)

- « chiffré » n'est employé que pour AES-GCM. Nulle part ailleurs.
- Ne jamais écrire « sécurisé » sans dire contre quoi.
- Jamais « militaire », « inviolable », « impossible à pirater », ni équivalent.

**Garde-fou de périmètre** : l'auth prouve **l'identité** et protège **la progression**, rien d'autre. Pas de multi-identité, pas de chemins BIP32, aucune fonctionnalité de portefeuille. La clé n'est jamais utilisable comme clé Bitcoin réelle.

---

## Où vit quoi

| Sujet | Emplacement |
| --- | --- |
| Domaine client complet | `src/Auth/` (5 sous-dossiers DDD ; le barrel racine reste **sans React** car `api/` l'importe) |
| Crypto pure (dérivation, signature, chiffrement) | `src/Auth/helpers/` (`deriveKeyPair`, `signChallenge`, `encryptVault`/`decryptVault`, `buildSignMessage`…) |
| Coffre IndexedDB + export `.bdw` | `src/Auth/helpers/createVault.ts`, `buildVaultExport.ts`, `parseVaultFile.ts` |
| Machine à états de session | `src/Auth/hooks/useAuthStore.ts` (+ `useAuth`/`AuthContext`) |
| Orchestrateur d'UI (écrans) | `src/Auth/hooks/useAuthFlowStore.ts` — **UI uniquement**, ne double jamais l'état d'auth |
| Écrans (dumb) | `src/Auth/components/` (overlay, landing, wizard, unlock, restore, import, settings, notice) |
| Routes serveur | `api/auth/{username-available,challenge,verify,register,logout,session}.ts`, `api/progress.ts` |
| Helpers serveur | `api/_lib/` (db, session JWT via WebCrypto-HMAC, rateLimit, clientKey, mergeProgress, username) |
| Schéma | `api/_db/schema.sql` (Neon Postgres) |

**Gotcha ESM** : le runtime Vercel exécute `api/` en ESM natif → imports relatifs avec extension `.js` explicite (NodeNext). `src/Auth` est isomorphe (importé par `api/`) et suit la même règle. `npm run typecheck:api` échoue si une extension manque.

---

## Purge des défis (`auth_challenges`)

Fait, **sans cron dédié** : `api/auth/challenge.ts` supprime de manière opportuniste les défis expirés depuis plus d'une heure à chaque création de défi (`delete from auth_challenges where expires_at < now() - interval '1 hour'`). La table reste bornée. Le CDC (§5.3) proposait un cron quotidien **ou** ce nettoyage opportuniste ; on a retenu le second.

---

## Sauvegarde de la base

La base Neon contient la **seule** copie de la progression (non reconstructible en cas de perte). Deux niveaux :

1. **Neon** fournit une restauration point-in-time / des sauvegardes selon le plan. À vérifier sur le plan retenu (les tiers gratuits ont peu de rétention).
2. Si la rétention Neon est insuffisante, prévoir un **export programmé** (dump de `accounts` + `progress` vers un stockage externe). Non implémenté : nécessite une destination de stockage — à décider (Vercel Blob, S3…). Documenté ici comme dette explicite.

---

## En-têtes de sécurité et CSP

### Livré (sans risque de casser l'app)

`vercel.json` applique à toutes les routes des en-têtes qui **ne bloquent aucune ressource** :

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=()`

### À activer : la CSP (mitigation XSS de la clé privée en mémoire)

La CSP **bloque** des ressources : à activer avec méthode, parce qu'une erreur casse le rendu. Contraintes connues de cette app :

- **Polices Google Fonts** (chargées via `<link>` externe) → `style-src` doit inclure `https://fonts.googleapis.com`, `font-src` inclure `https://fonts.gstatic.com`.
- **Styles React en ligne** (`CSSProperties`) partout → `style-src 'unsafe-inline'` inévitable (les styles en ligne ne peuvent pas porter de nonce/hash en pratique).
- **Un script inline** dans `index.html` (anti-FOUC du thème, bloquant avant le premier paint) → l'autoriser par **hash** `'sha256-…'`, pas par `'unsafe-inline'`. Attention : Vite peut transformer/minifier ce script au build → **recalculer le hash depuis la sortie buildée** (`dist/index.html` ou une page prérendue), pas depuis `index.html` source. Hash du script source (point de départ, à revérifier) : `sha256-ZQcKrOEJYWjAv+ezrhVVtVX6L474i+r1JGZANWiZmm4=`.
- Bundle Vite same-origin → `script-src 'self'`. API same-origin → `connect-src 'self'`.

Politique cible :

```
default-src 'self';
script-src 'self' 'sha256-<hash du script buildé>';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
object-src 'none'
```

**Rollout recommandé** : d'abord `Content-Security-Policy-Report-Only` sur un déploiement de preview, ouvrir la console, naviguer + ouvrir la modale d'auth, corriger toute violation (polices, script, styles), **puis** basculer en `Content-Security-Policy` enforce. La vérification exige un déploiement réel (une CSP en en-tête HTTP ne s'applique pas sous `vite dev`).

---

## Reste à faire (dette explicite)

- **CSP enforce** : voir ci-dessus (report-only → enforce, hash à recalculer au build).
- **Nettoyage `*_migrated_backup` à 30 j** (§8) : la migration invité→compte pose un drapeau `bd:migrated` mais ne conserve pas de copie locale datée à purger. À implémenter côté `src/UserData/` si on veut le filet de 30 jours.
- **Copie « déconnexion »** (§14.11) : le libellé sous « Me déconnecter » n'a pas été retouché faute de copie éditoriale ; en attente de l'édito.
- **Doc CDC** : plusieurs éléments ont été décommissionnés côté code (message navigation privée §14.12, bloc effacement §14.11, affichage clé publique §14.11) — à marquer « retiré » dans le CDC lors d'une passe.
