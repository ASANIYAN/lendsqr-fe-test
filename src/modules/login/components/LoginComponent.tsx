import React from "react";
import styles from "./Login.module.scss";
import { LoginLeftSide } from "./LoginLeftSide";
import { LoginRightSide } from "./LoginRightSide";

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
