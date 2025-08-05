import type { RouteObject } from "react-router-dom";
import { Home } from "../components/Home";
import Stock from "../components/Stocks/Stock";
import Sales from "../components/Sales/Sales";

export const productRoute: RouteObject[] = [
  {
    path: "dashboard",
    element: <Home />,
  },
  {
    path: "stock",
    element: <Stock />,
  },
  {
    path: "sales",
    element: <Sales />,
  },
];
