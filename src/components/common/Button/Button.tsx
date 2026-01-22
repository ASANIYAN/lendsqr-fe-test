import React from "react";
import { Loader2 } from "lucide-react";
import styles from "./Button.module.scss";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outlined";
  color?: "primary" | "danger" | "secondary" | "inactive" | "pending";
  size?: "small" | "medium";
  uppercase?: boolean;
  fontFamily?: "work-sans" | "eau-sans";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      color = "primary",
      size = "medium",
      uppercase = false,
      fontFamily = "work-sans",
      leftIcon,
      rightIcon,
      loading = false,
      fullWidth = false,
      disabled = false,
      className = "",
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    // Build class names dynamically
    const buttonClasses = [
      styles.button,
      styles[variant],
      variant === "outlined" && styles[`outlined-${color}`],
      styles[size],
      uppercase && styles.uppercase,
      loading && styles.loading,
      fullWidth && styles.fullWidth,
      fontFamily === "eau-sans" && styles.eauSans,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner - appears on left */}
        {loading && (
          <Loader2 className={styles.spinner} size={16} aria-hidden="true" />
        )}

        {/* Left icon - hidden when loading */}
        {leftIcon && !loading && (
          <span className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button text - always visible */}
        <span className={styles.content}>{children}</span>

        {/* Right icon - always visible when provided */}
        {rightIcon && (
          <span className={styles.iconRight} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
