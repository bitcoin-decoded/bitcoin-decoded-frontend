# SEO, tel que construit

Ce que le site fait réellement pour les moteurs de recherche, où ça vit, et pourquoi.

Le [document d'architecture](https://claude.ai/code/artifact/7bdc9fc2-1643-44b4-876e-352dabb80a0a) reste le **plan** et garde sa valeur d'intention. Plusieurs de ses affirmations se sont révélées fausses à l'exécution : la section « Là où le plan s'est trompé » les recense. En cas de désaccord entre les deux, **ce fichier fait foi**.

---

## L'état en un coup d'œil

| | |
| --- | --- |
| Rendu | prérendu statique au build, hydratation volontairement absente |
| Fichiers HTML | 52, soit 26 routes × 2 langues |
| Sitemap | 50 URLs (les deux pages 404 exclues) |
| Domaine | `https://bitcoindecoded.fr` |
| Indexation | ouverte sur le domaine, bloquée sur `*.vercel.app` |

Chaque page porte son `<title>`, sa `description`, son `canonical`, ses paires `hreflang` et sa prose complète, **sans exécution de JavaScript**.

---

## Où vit quoi

| Sujet | Emplacement |
| --- | --- |
| Titres et descriptions, FR et EN | `src/Seo/data/getPageSeo.ts` |
| Domaine | `src/Seo/data/SITE.ts` |
| Pages qui gardent la marque dans leur titre | `src/Seo/data/BRANDED_ROUTES.ts` |
| Balises de tête | `src/Seo/components/PageHead.tsx` |
| Adresses par route et par langue | `src/Routing/data/ROUTE_SLUG.ts` |
| Préfixe de langue | `src/Routing/data/LANGUAGE_PREFIX.ts` |
| Adresse → route + langue | `src/Routing/helpers/resolveRoute.ts` |
| Génération des fichiers et du sitemap | `scripts/prerender.mjs` |
| Réécritures et `noindex` d'hôte | `vercel.json` |

Le *pourquoi* de chaque choix est en commentaire à côté du code concerné. Ce fichier est la carte, pas la doublure.

---

## Les décisions qui pèsent

### Lecture libre, progression séquentielle

Une page verrouillée était redirigée vers le chapitre 01. Un robot n'ayant pas de `localStorage`, il était enfermé hors de tout module : **3 chapitres sur 19 atteignables**.

Aujourd'hui la lecture n'est jamais refusée, seule la *progression* reste séquentielle. Un chapitre lu hors ordre ne peut pas être scellé, donc n'accorde aucun badge et n'avance pas la frontière.

### Tous les blocs dans le document, un seul visible

`BlockReader` ne montait que les blocs atteints. Au build, sans progression à restaurer, cela donnait **20 blocs sur 132**. Les blocs non atteints sont désormais rendus et masqués en `display: none`, ce qui les garde indexables tout en les tenant hors de l'arbre d'accessibilité et hors du flux.

### `createRoot`, pas `hydrateRoot`

Le client remplace le HTML prérendu au lieu de l'hydrater. Hydrater exigerait que le premier rendu client soit identique au fichier, alors que thème, badges et position de lecture viennent d'un stockage que le build ne voit pas. Ce HTML existe pour être lu par les robots, pas pour épargner du travail au navigateur.

### Aucune redirection de langue

La langue est dans l'URL et nulle part ailleurs. Une préférence antérieure est ignorée. Rediriger selon l'`Accept-Language` ou une visite passée cache une version aux robots, ce que Google déconseille explicitement.

### Fichiers plats, pas des dossiers

Les pages sont écrites en `<chemin>.html`, pas `<chemin>/index.html`. Un hébergeur statique ne résout un dossier vers son index **que si l'adresse finit par un slash**, et les adresses produites ici n'en ont pas. Écrit autrement, **toutes les pages répondaient la home**.

### Le `noindex` est conditionné à l'hôte

`vercel.json` pose `X-Robots-Tag: noindex` uniquement sur `bitcoin-decoded.vercel.app`. Un `noindex` global aurait suivi sur le domaine réel sans que personne ne le remarque. Ainsi cadré, attacher un domaine suffit à le rendre indexable, sans rien à défaire.

### La réécriture pointe sur la 404

Les 52 routes ayant un fichier, la réécriture ne rattrape que l'inconnu. Elle vise `/404.html` et non la home : sinon une adresse inexistante servirait le contenu de la home à une URL qui n'est pas la sienne.

---

## Ce qui est délibérément absent

À ne pas « corriger » sans lire la raison.

- **`og:image` et cartes X.** Aucune image de partage n'existe. En nommer une qui n'existe pas casse toutes les cartes au lieu de les laisser sobres. Un compte X est prévu ; les deux se traiteront ensemble.
- **Canonical sur les pages 404.** Une page qui refuse l'indexation n'a pas d'adresse canonique à revendiquer.
- **`lastmod`, `changefreq`, `priority` au sitemap.** Aucune date honnête à donner, et les deux autres sont ignorés depuis des années.
- **Un vrai statut 404.** Un hébergement statique sert le même fichier pour tout chemin et ne peut pas faire varier le statut. C'est le `noindex` qui neutralise le risque ; il restera un signalement « soft 404 » cosmétique en Search Console.

---

## Ajouter un chapitre

1. `ROUTE_NAME` : l'identifiant
2. `ROUTE_SLUG` : son adresse **dans les deux langues**
3. `getPageSeo` : titre et description **dans les deux langues**
4. `NAVIGATION_TREE` : sa place dans le module
5. `PAGE_METADATA` : après `npm run audit:reading-time`
6. `AppRouter` : la route vers le composant

TypeScript refuse de compiler si 2 ou 3 manquent, les tables étant des `Record<RouteName, …>`. Rien ne rappelle les autres.

Le sitemap et les fichiers HTML se génèrent tout seuls : ils lisent les mêmes tables.

---

## Là où le plan s'est trompé

Consigné parce que le document d'architecture porte encore ces erreurs.

| Le plan disait | La réalité |
| --- | --- |
| « HashRouter à migrer vers BrowserRouter » | aucune librairie de routing, un contexte maison de 50 lignes |
| « trois familles de polices mortes » | seul **Inter** l'est ; Cormorant Garamond porte le logo |
| Phase 5 « moyenne » | le prérendu ne publiait qu'un bloc sur six, il a fallu revoir le moteur de lecture d'abord |
| `Progression` répond à deux questions | une seule ; « est-ce dans l'ordre » et « peut-on sceller » sont la même |
| Le domaine conditionne la phase 3 | il ne conditionne que le canonical, l'`og:url` et le sitemap, donc la 5b |

Deux cycles d'imports ont aussi été découverts en chemin, `Routing → Page` et `Design → Interactive`, invisibles sous Vite qui les résout en bundlant. Le test SSR de `src/Platform/nodeSafety.test.tsx` les empêche de revenir.

---

## Ce qui reste

- **Phase 7** : découpage du bundle, images, JSON-LD, retrait d'Inter
- **[#165](https://github.com/bitcoin-decoded/bitcoin-decoded-frontend/issues/165)** : la suite de tests met 1 à 2 minutes, presque tout en chargement de modules
- **[#166](https://github.com/bitcoin-decoded/bitcoin-decoded-frontend/issues/166)** : avertissements React de clés, causés par `transformFrText`
- Attacher `bitcoindecoded.fr` dans Vercel, puis soumettre le sitemap en Search Console
