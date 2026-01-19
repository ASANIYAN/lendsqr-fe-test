import React from "react";
import styles from "./LoginLeftSide.module.scss";
import lendsqrLogo from "../../../assets/lendsqr-logo.png";
import heroImage from "../../../assets/login-hero.svg";

export const LoginLeftSide: React.FC = () => {
  return (
    <div className={styles.leftSide}>
      <div className={styles.logoContainer}>
        <img src={lendsqrLogo} alt="Lendsqr Logo" className={styles.logo} />
      </div>

      <div className={styles.heroContainer}>
        <img
          src={heroImage}
          alt="Login Hero Illustration"
          className={styles.heroImage}
        />
      </div>
    </div>
  );
};
