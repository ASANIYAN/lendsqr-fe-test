import { ListFilter } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/common";
import type { User } from "../utils/types";
import styles from "./UserTableColumns.module.scss";
import { UserActionsCell } from "./UserActionsCell";

interface UserTableColumnProps {
  onViewDetails: (id: string) => void;
  onBlacklistUser: (id: string) => void;
  onActivateUser: (id: string) => void;
  onFilterClick: (column: string) => void;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
}

export const createUserTableColumns = ({
  onViewDetails,
  onBlacklistUser,
  onActivateUser,
  onFilterClick,
}: UserTableColumnProps): ColumnDef<User>[] => [
  {
    accessorKey: "orgName",
    header: () => (
      <div className={styles.headerWithFilter}>
        <span className={styles.headerText}>Organization</span>
        <button
          onClick={() => onFilterClick("organization")}
          className={styles.filterButton}
          aria-label="Filter by organization"
        >
          <ListFilter size={16} />
        </button>
      </div>
    ),
    cell: ({ row }) => (
      <span className={styles.cellText}>{row.original.orgName}</span>
    ),
  },
  {
    accessorKey: "userName",
    header: () => (
      <div className={styles.headerWithFilter}>
        <span className={styles.headerText}>Username</span>
        <button
          onClick={() => onFilterClick("username")}
          className={styles.filterButton}
          aria-label="Filter by username"
        >
          <ListFilter size={16} />
        </button>
      </div>
    ),
    cell: ({ row }) => (
      <span className={styles.cellText}>{row.original.userName}</span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <div className={styles.headerWithFilter}>
        <span className={styles.headerText}>Email</span>
        <button
          onClick={() => onFilterClick("email")}
          className={styles.filterButton}
          aria-label="Filter by email"
        >
          <ListFilter size={16} />
        </button>
      </div>
    ),
    cell: ({ row }) => (
      <span className={styles.cellText}>{row.original.email}</span>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => (
      <div className={styles.headerWithFilter}>
        <span className={styles.headerText}>Phone Number</span>
        <button
          onClick={() => onFilterClick("phoneNumber")}
          className={styles.filterButton}
          aria-label="Filter by phone number"
        >
          <ListFilter size={16} />
        </button>
      </div>
    ),
    cell: ({ row }) => (
      <span className={styles.cellText}>{row.original.phoneNumber}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className={styles.headerWithFilter}>
        <span className={styles.headerText}>Date Joined</span>
        <button
          onClick={() => onFilterClick("date")}
          className={styles.filterButton}
          aria-label="Filter by date joined"
        >
          <ListFilter size={16} />
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return <span className={styles.cellText}>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className={styles.headerWithFilter}>
        <span className={styles.headerText}>Status</span>
        <button
          onClick={() => onFilterClick("status")}
          className={styles.filterButton}
          aria-label="Filter by status"
        >
          <ListFilter size={16} />
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      return (
        <Badge
          variant={status as "active" | "inactive" | "pending" | "blacklisted"}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => null,
    cell: ({ row }) => (
      <UserActionsCell
        row={row}
        onViewDetails={onViewDetails}
        onBlacklistUser={onBlacklistUser}
        onActivateUser={onActivateUser}
      />
    ),
  },
];
