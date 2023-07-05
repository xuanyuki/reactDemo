import { lazy } from "react";

const routes = [
  {
    path: "/search",
    element: lazy(() => import("../views/Search")),
  },
  {
    path: "/login",
    element: lazy(() => import("../views/Login")),
  },
];

export default routes;
