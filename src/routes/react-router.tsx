import { createBrowserRouter, type RouteObject } from "react-router-dom";

import { authRoute } from "../api/auth/auth.routes";
import { productRoute } from "../api/product.routes";
import NotFoundPage from "../components/NotFoundPage";
import { customerRoute } from "../api/customer.routes";

const routes: RouteObject[] = [
  {
    path: "/auth/*",
    children: authRoute,
  },
  {
    path: "/product/*",
    children: productRoute,
  },
  {
    path: "/customer/*",
    children: customerRoute,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);
