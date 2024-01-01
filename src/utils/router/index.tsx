import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

/* eslint-disable react-refresh/only-export-components */
const Root = lazy(() => import("@/pages/root"));
const Home = lazy(() => import("@/pages/home"));
const Collections = lazy(() => import("@/pages/collections"));
const CollectionMusicPlayer = lazy(
  () => import("@/pages/collections/musicPlayer"),
);
const Settings = lazy(() => import("@/pages/settings"));
const About = lazy(() => import("@/pages/about"));
const Error404 = lazy(() => import("@/pages/404"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "home",
        element: <Home />,
      },

      {
        path: "collections",
        element: <Collections />,
        children: [
          {
            path: "musicPlayer",
            element: <CollectionMusicPlayer />,
          },
        ],
      },

      {
        path: "settings",
        element: <Settings />,
      },

      {
        path: "about",
        element: <About />,
      },
      {
        path: "404",
        element: <Error404 />,
      },
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
    ],
  },
]);
