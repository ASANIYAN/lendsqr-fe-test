import {
  createBrowserRouter,
  type RouteObject,
  Navigate,
} from "react-router-dom";
import App from "@/App";
import Login from "@/modules/login/views/Login";
import { Users } from "@/modules/users/views/Users/index";
import UserDetails from "@/modules/users/views/UserDetails/UserDetails";

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
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
