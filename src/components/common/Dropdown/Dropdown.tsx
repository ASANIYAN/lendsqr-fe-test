import React, { useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";

export interface DropdownAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  actions: DropdownAction[];
  className?: string;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ isOpen, onClose, actions, className = "" }, ref) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const dropdownClasses = [styles.dropdown, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref || dropdownRef} className={dropdownClasses}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => {
              action.onClick();
              onClose();
            }}
            className={`${styles.action} ${
              action.variant === "danger" ? styles.danger : ""
            }`}
          >
            <span className={styles.icon}>{action.icon}</span>
            <span className={styles.label}>{action.label}</span>
          </button>
        ))}
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
