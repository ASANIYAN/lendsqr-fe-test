import React from "react";
import styles from "./BaseInput.module.scss";

export interface BaseInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  variant?: "primary" | "secondary";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  containerClassName?: string;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      variant = "primary",
      leftIcon,
      rightIcon,
      error = false,
      disabled = false,
      containerClassName = "",
      className = "",
      type = "text",
      ...props
    },
    ref,
  ) => {
    const containerClasses = [
      styles.inputContainer,
      styles[variant],
      error && styles.error,
      disabled && styles.disabled,
      containerClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [styles.input, className].filter(Boolean).join(" ");

    return (
      <div className={containerClasses}>
        {leftIcon && (
          <div className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error}
          {...props}
        />

        {rightIcon && (
          <div className={styles.iconRight}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

BaseInput.displayName = "BaseInput";
