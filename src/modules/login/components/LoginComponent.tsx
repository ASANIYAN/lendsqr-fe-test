import React from "react";
import styles from "./Login.module.scss";
import { LoginLeftSide } from "@/modules/login/components/LoginLeftSide";
import { LoginRightSide } from "@/modules/login/components/LoginRightSide";

export const LoginComponent: React.FC = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <LoginLeftSide />
      </div>
      <div className={styles.rightSide}>
        <LoginRightSide />
      </div>
    </div>
  );
};
