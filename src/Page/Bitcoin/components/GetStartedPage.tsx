import { type FC } from "react";

import { useTranslation } from "../../../I18n";
import { CustodyOptions, PathFinder, WalletFamilies } from "../../../Interactive";
import { PageTemplate } from "../../Shared";

export const GetStartedPage: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.getStarted")}>
      <p>
        {fr
          ? "Tu veux entrer dans le terrier du lapin blanc. Tu es au bon endroit. On fait ça proprement."
          : "You want to head down the rabbit hole. You're in the right place. Let's do this properly."}
      </p>
      <CustodyOptions />
      <p>
        {fr
          ? "Si tu choisis l'auto-conservation, deux grandes familles de portefeuilles s'offrent à toi. Chacune représente un compromis différent entre simplicité d'utilisation et souveraineté."
          : "If you go for self-custody, two big families of wallets are open to you. Each strikes a different balance between ease of use and sovereignty."}
      </p>
      <WalletFamilies />
      <p>
        {fr
          ? "Maintenant que tu as les repères qu'il te faut, réponds à 4 questions, simplement. Et à partir de ces réponses, on met en place un plan d'onboarding personnalisé."
          : "Now that you've got the bearings you need, just answer 4 questions. From your answers, we'll put together a personalized onboarding plan."}
      </p>
      <PathFinder />
    </PageTemplate>
  );
};
