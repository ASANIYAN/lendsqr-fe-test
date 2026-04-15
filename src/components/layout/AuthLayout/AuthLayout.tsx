import React from "react";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import styles from "./AuthLayout.module.scss";
import { useAuthLayout } from "./useAuthLayout";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useAuthLayout();

  return (
    <div className={styles.authLayout}>
      <TopBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className={styles.mainContainer}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className={styles.content}>
          <section className={styles.contentSection}>{children}</section>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
