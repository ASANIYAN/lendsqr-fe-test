import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./BaseSelect.module.scss";

export interface SelectOption {
  label: string;
  value: string;
}

export interface BaseSelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  variant?: "primary" | "secondary";
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  containerClassName?: string;
}

export const BaseSelect = React.forwardRef<HTMLSelectElement, BaseSelectProps>(
  (
    {
      variant = "primary",
      options,
      placeholder,
      error = false,
      disabled = false,
      containerClassName = "",
      className = "",
      ...props
    },
    ref,
  ) => {
    const containerClasses = [
      styles.selectContainer,
      styles[variant],
      error && styles.error,
      disabled && styles.disabled,
      containerClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const selectClasses = [styles.select, className].filter(Boolean).join(" ");

    return (
      <div className={containerClasses}>
        <select
          ref={ref}
          disabled={disabled}
          className={selectClasses}
          aria-invalid={error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className={styles.iconRight} aria-hidden="true">
          <ChevronDown size={16} />
        </div>
      </div>
    );
  },
);

BaseSelect.displayName = "BaseSelect";
