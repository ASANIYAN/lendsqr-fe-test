import React from "react";
import styles from "./LoginRightSide.module.scss";
import { FormInput } from "../../../components/common/Input";
import { Button } from "../../../components/common/Button/Button";
import { useLoginForm } from "../hooks/useLoginForm";
import type { LoginFormType } from "../utils/validation";

export const LoginRightSide: React.FC = () => {
  const { form, handleSubmit, isLoading } = useLoginForm();

  const onSubmit = (data: LoginFormType) => {
    handleSubmit(data);
  };

  return (
    <div className={styles.rightSide}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome!</h1>
        <p className={styles.subtitle}>Enter details to login.</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <FormInput
            control={form.control}
            name="email"
            placeholder="Email"
            type="email"
            variant="primary"
          />

          <FormInput
            control={form.control}
            name="password"
            placeholder="Password"
            type="password"
            variant="primary"
          />

          <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>

          <Button
            type="submit"
            variant="primary"
            size="medium"
            loading={isLoading}
            uppercase
            fullWidth
            className={styles.loginButton}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};
