import React from "react";
import { Search } from "lucide-react";
import styles from "./SearchInput.module.scss";

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  onSearch?: (value: string) => void;
  error?: boolean;
  containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      error = false,
      disabled = false,
      containerClassName = "",
      className = "",
      placeholder = "Search for anything",
      value,
      onChange,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const containerClasses = [
      styles.searchContainer,
      error && styles.error,
      disabled && styles.disabled,
      containerClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [styles.searchInput, className]
      .filter(Boolean)
      .join(" ");

    const handleSearch = () => {
      if (onSearch && typeof value === "string") {
        onSearch(value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
      onKeyDown?.(e);
    };

    const handleIconClick = () => {
      if (!disabled) {
        handleSearch();
      }
    };

    const handleIconKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        handleSearch();
      }
    };

    return (
      <div className={containerClasses}>
        <input
          ref={ref}
          type="text"
          disabled={disabled}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          aria-invalid={error}
          aria-label="Search input"
          {...props}
        />

        <div
          className={`${styles.searchIconContainer} ${disabled ? styles.disabled : ""}`}
          onClick={handleIconClick}
          onKeyDown={handleIconKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-label="Search"
        >
          <Search className={styles.searchIcon} />
        </div>
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
