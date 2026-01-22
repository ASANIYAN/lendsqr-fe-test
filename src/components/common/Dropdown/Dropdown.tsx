import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Dropdown.module.scss";

export interface DropdownAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  actions: DropdownAction[];
  trigger: React.ReactNode; // We pass the ellipsis button here
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  actions,
  trigger,
}) => {
  return (
    <DropdownMenu.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.dropdown}
          sideOffset={5}
          align="end"
          // This handles the smart "flip" automatically
          avoidCollisions={true}
        >
          {actions.map((action, index) => (
            <DropdownMenu.Item
              key={index}
              className={`${styles.action}`}
              onClick={() => {
                action.onClick();
                onClose();
              }}
            >
              <span className={styles.icon}>{action.icon}</span>
              <span className={styles.label}>{action.label}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
