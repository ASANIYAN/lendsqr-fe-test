import { useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  BaseInput,
  type BaseInputProps,
} from "@/components/common/Input/BaseInput";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/common/Field";
import styles from "./FormInput.module.scss";

export interface FormInputProps<T extends FieldValues> extends Omit<
  BaseInputProps,
  "error"
> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  type = "text",
  ...baseInputProps
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordToggle = isPasswordField ? (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className={styles.passwordToggle}
      aria-label={showPassword ? "Hide password" : "Show password"}
      tabIndex={0}
    >
      {showPassword ? "HIDE" : "SHOW"}
    </button>
  ) : null;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error: fieldError },
      }) => {
        const hasError = !!fieldError;

        return (
          <Field data-invalid={hasError} className={containerClassName}>
            {label && (
              <FieldLabel htmlFor={name} className={labelClassName}>
                {label}
              </FieldLabel>
            )}

            <BaseInput
              ref={ref}
              id={name}
              type={inputType}
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              error={hasError}
              rightIcon={passwordToggle || baseInputProps.rightIcon}
              {...baseInputProps}
            />

            {description && <FieldDescription>{description}</FieldDescription>}

            {hasError && (
              <FieldError errors={[fieldError]} className={errorClassName} />
            )}
          </Field>
        );
      }}
    />
  );
}

export default FormInput;
