import React from "react";
import { Eye, UserX, UserCheck } from "lucide-react";
import type { DropdownAction } from "./Dropdown";

// User actions dropdown helper
export const createUserDropdownActions = (
  userId: string,
  onViewDetails: (id: string) => void,
  onBlacklistUser: (id: string) => void,
  onActivateUser: (id: string) => void,
): DropdownAction[] => [
  {
    label: "View Details",
    icon: React.createElement(Eye, { size: 16 }),
    onClick: () => onViewDetails(userId),
  },
  {
    label: "Blacklist User",
    icon: React.createElement(UserX, { size: 16 }),
    onClick: () => onBlacklistUser(userId),
    variant: "danger",
  },
  {
    label: "Activate User",
    icon: React.createElement(UserCheck, { size: 16 }),
    onClick: () => onActivateUser(userId),
  },
];
