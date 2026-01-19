import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./styles/main.scss";
import router from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      richColors={false}
      toastOptions={{
        style: {
          fontFamily: "inherit",
        },
      }}
    />
  </StrictMode>,
);
