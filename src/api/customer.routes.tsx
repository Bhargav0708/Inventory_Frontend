import type { RouteObject } from "react-router-dom";
import Customer from "../components/Customer/Customer";
import Cart from "../components/Customer/Cart";
import History from "../components/Customer/History";
import Cartapi from "../components/Customer/Cartapi";

export const customerRoute: RouteObject[] = [
  {
    path: "dashboard",
    element: <Customer />,
  },
  {
    path: "cart",
    // element: <Cart />,
    element: <Cartapi />,
  },
  {
    path: "history",
    element: <History />,
  },
];
