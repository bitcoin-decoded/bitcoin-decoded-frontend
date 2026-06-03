import { type FC } from "react";

import {
  Banking1Page,
  Banking2Page,
  Banking3Page,
  Banking4Page,
  Banking5Page,
  Banking6Page,
  Banking7Page,
  Bitcoin1Page,
  Bitcoin2Page,
  Bitcoin3Page,
  Bitcoin4Page,
  Bitcoin5Page,
  Bitcoin6Page,
  Bitcoin7Page,
  Bitcoin8Page,
  Bitcoin9Page,
  MoneyLaws1Page,
  MoneyLaws2Page,
  MoneyLaws3Page,
  MoneyLaws4Page,
  MoneyLaws5Page,
} from "../../Page";
import { HomePage } from "../../Page";
import { ROUTE_NAME, useRouterContext } from "../../Routing";

export const AppRouter: FC = () => {
  const { currentPage } = useRouterContext();

  const renderPage = () => {
    switch (currentPage) {
      case ROUTE_NAME.HomePage:
        return <HomePage />;
      case ROUTE_NAME.Banking_1:
        return <Banking1Page />;
      case ROUTE_NAME.Banking_2:
        return <Banking2Page />;
      case ROUTE_NAME.Banking_3:
        return <Banking3Page />;
      case ROUTE_NAME.Banking_4:
        return <Banking4Page />;
      case ROUTE_NAME.Banking_5:
        return <Banking5Page />;
      case ROUTE_NAME.Banking_6:
        return <Banking6Page />;
      case ROUTE_NAME.Banking_7:
        return <Banking7Page />;

      case ROUTE_NAME.MoneyLaws_1:
        return <MoneyLaws1Page />;
      case ROUTE_NAME.MoneyLaws_2:
        return <MoneyLaws2Page />;
      case ROUTE_NAME.MoneyLaws_3:
        return <MoneyLaws3Page />;
      case ROUTE_NAME.MoneyLaws_4:
        return <MoneyLaws4Page />;
      case ROUTE_NAME.MoneyLaws_5:
        return <MoneyLaws5Page />;

      case ROUTE_NAME.Bitcoin_1:
        return <Bitcoin1Page />;
      case ROUTE_NAME.Bitcoin_2:
        return <Bitcoin2Page />;
      case ROUTE_NAME.Bitcoin_3:
        return <Bitcoin3Page />;
      case ROUTE_NAME.Bitcoin_4:
        return <Bitcoin4Page />;
      case ROUTE_NAME.Bitcoin_5:
        return <Bitcoin5Page />;
      case ROUTE_NAME.Bitcoin_6:
        return <Bitcoin6Page />;
      case ROUTE_NAME.Bitcoin_7:
        return <Bitcoin7Page />;
      case ROUTE_NAME.Bitcoin_8:
        return <Bitcoin8Page />;
      case ROUTE_NAME.Bitcoin_9:
        return <Bitcoin9Page />;

      default:
        return <HomePage />;
    }
  };

  const isHomePage = currentPage === ROUTE_NAME.HomePage;

  return (
    <div key={currentPage} className={isHomePage ? undefined : "page-enter"}>
      {renderPage()}
    </div>
  );
};
