import { type FC } from "react";

import { useTranslation } from "../../../I18n";
import { PageTemplate } from "../../Shared/components";

export const MoneyLaws5Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.orangeSynthesis")}>
      <p>
        {fr
          ? "Félicitations pour vous être attaqué à cette partie assez technique."
          : "Congratulations for tackling this fairly technical section."}
      </p>
      <p>
        {fr
          ? "Vous avez maintenant une vision d'ensemble du diagnostic ! Et si l'on assemble les nouvelles pièces du puzzle, l'image devient une fois de plus limpide."
          : "You now have a big-picture view of the diagnosis! And when we assemble the new pieces of the puzzle, the picture once again becomes crystal clear."}
      </p>
      <p>
        {fr
          ? "Nous avons d'abord découvert que la monnaie n'est pas un simple objet, mais une technologie de mémoire collective conçue pour collaborer au-delà de nos limites biologiques. Pour remplir son rôle de « batterie », elle doit posséder l'attribut de dureté."
          : 'We first discovered that money is not a simple object but a collective memory technology designed for collaboration beyond our biological limits. To fulfill its role as a "battery," it must possess the attribute of hardness.'}
      </p>
      <p>
        {fr
          ? "Nous avons également vu que nous utilisons aujourd'hui une monnaie fiat dont la dureté est de zéro. Cette facilité de création permet aux banques d'injecter des liquidités et de saboter le signal le plus important de notre économie : le taux d'intérêt. En manipulant ce « prix du temps », on fait croire aux entrepreneurs que l'épargne est abondante alors que les ressources réelles ne sont pas là. C'est le mensonge monétaire. Il en résulte des malinvestissements massifs et des cycles de crises où la réalité finit toujours par corriger les excès du boom."
          : 'We also saw that we currently use fiat money whose hardness is zero. This ease of creation allows banks to inject liquidity and sabotage the most important signal in our economy: the interest rate. By manipulating this "price of time," entrepreneurs are led to believe that savings are abundant when real resources are simply not there. This is the monetary lie. It results in massive malinvestment and boom-bust cycles where reality always ends up correcting the excesses of the boom.'}
      </p>
      <p>
        {fr
          ? "Nous avons vu par la suite que si la manipulation des taux d'intérêt fausse la boussole, la tentation de la planification centrale (le socialisme) revient à éteindre complètement le tableau de bord. Sans propriété privée et sans prix de marché libres, il est mathématiquement impossible de calculer la valeur relative des choses. On avance alors dans le noir, incapable de savoir si l'on crée de la richesse ou si l'on gaspille des ressources dans des projets parfois absurdes."
          : "We then saw that while interest rate manipulation distorts the compass, the temptation of central planning (socialism) amounts to switching off the dashboard entirely. Without private property and free market prices, it is mathematically impossible to calculate the relative value of things. We then navigate in the dark, unable to know whether we are creating wealth or wasting resources on sometimes absurd projects."}
      </p>
      <p>
        {fr
          ? "Enfin, nous avons terminé par la méthodologie autrichienne. Au lieu de traiter les humains comme des atomes prévisibles à travers des statistiques mouvantes, nous partons de la logique de l'action humaine. C'est une science de la vérité qui nous apprend que l'on ne peut pas tricher impunément avec la rareté et le temps."
          : "Finally, we ended with the Austrian methodology. Instead of treating humans as predictable atoms through shifting statistics, we start from the logic of human action. It is a science of truth that teaches us we cannot cheat scarcity and time without consequences."}
      </p>
      <p>
        {fr
          ? "Nous avons maintenant compris pourquoi notre système actuel est structurellement instable. La batterie fuit, la boussole ment et le pilote est souvent aveugle. Dès lors, une question brûlante s'impose : « Existe-t-il une alternative capable de rendre le pouvoir aux individus, en étant à la fois une monnaie dure et impossible à manipuler par des autorités centralisées ? »"
          : 'We now understand why our current system is structurally unstable. The battery leaks, the compass lies, and the pilot is often blind. This raises a burning question: "Is there an alternative that can give power back to individuals, while being both a hard currency and impossible to manipulate by centralized authorities?"'}
      </p>
      <p>
        {fr
          ? "Il est maintenant temps de lever le voile sur la technologie qui incarne ce renouveau. Cap vers le grand final : Bitcoin."
          : "It is now time to unveil the technology that embodies this renewal. Onward to the grand finale: Bitcoin."}
      </p>
    </PageTemplate>
  );
};
