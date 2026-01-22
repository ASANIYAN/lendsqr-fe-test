import { useState } from "react";
import { type Row } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { createUserDropdownActions } from "@/components/common/Dropdown/dropdownHelpers";
import { Dropdown } from "@/components/common";

interface UserActionsCellProps<TData> {
  row: Row<TData>;
  onViewDetails: (id: string) => void;
  onBlacklistUser: (id: string) => void;
  onActivateUser: (id: string) => void;
}

export const UserActionsCell = <TData extends { id: string }>({
  row,
  onViewDetails,
  onBlacklistUser,
  onActivateUser,
}: UserActionsCellProps<TData>) => {
  const [isOpen, setIsOpen] = useState(false);
  const userId = row.original.id;

  const actions = createUserDropdownActions(
    userId,
    onViewDetails,
    onBlacklistUser,
    onActivateUser,
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      actions={actions}
      trigger={
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#545F7D",
          }}
        >
          <EllipsisVertical size={20} />
        </button>
      }
    />
  );
};
