import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { MainLayout } from "../../layouts";

const Home = lazy(() => import("../../../pages/home"));
const Page1 = lazy(() => import("../../../pages/page1"));
const Page2 = lazy(() => import("../../../pages/page2"));

export function Router() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "page1",
          element: (
            <Suspense fallback={<div>...</div>}>
              <Page1 />
            </Suspense>
          ),
        },
        {
          path: "page2",
          element: (
            <Suspense fallback={<div>...</div>}>
              <Page2 />
            </Suspense>
          ),
        },
        { path: "*", element: <Navigate to={"/"} replace /> },
      ],
    },
  ]);
}
