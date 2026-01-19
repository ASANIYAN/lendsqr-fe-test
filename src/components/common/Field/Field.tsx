import React from "react";
import styles from "./Field.module.scss";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ children, className = "", ...props }, ref) => {
    const fieldClasses = [styles.field, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={fieldClasses} {...props}>
        {children}
      </div>
    );
  }
);

Field.displayName = "Field";

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, className = "", ...props }, ref) => {
    const labelClasses = [styles.label, className].filter(Boolean).join(" ");

    return (
      <label ref={ref} className={labelClasses} {...props}>
        {children}
      </label>
    );
  }
);

FieldLabel.displayName = "FieldLabel";

export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FieldDescription = React.forwardRef<HTMLDivElement, FieldDescriptionProps>(
  ({ children, className = "", ...props }, ref) => {
    const descriptionClasses = [styles.description, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={descriptionClasses} {...props}>
        {children}
      </div>
    );
  }
);

FieldDescription.displayName = "FieldDescription";

export interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errors?: Array<{ message?: string }>;
  children?: React.ReactNode;
}

export const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ errors, children, className = "", ...props }, ref) => {
    const errorClasses = [styles.error, className].filter(Boolean).join(" ");
    
    const errorMessage = errors?.[0]?.message || children;
    
    if (!errorMessage) return null;

    return (
      <div ref={ref} className={errorClasses} {...props}>
        {errorMessage}
      </div>
    );
  }
);

FieldError.displayName = "FieldError";
