import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";
import Login from "../modules/login/views/Login";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>Something went wrong!</div>,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: (
          <div>
            Welcome! Please go to <a href="/login">/login</a> to access the
            application.
          </div>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
