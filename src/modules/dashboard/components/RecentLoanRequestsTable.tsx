import React, { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge, DataTable } from "@/components/common";
import type { BadgeVariant } from "@/components/common/Badge/Badge";
import { useDataTable } from "@/hooks/useDataTable";
import type { LoanRequest } from "../utils/types";
import styles from "./RecentLoanRequestsTable.module.scss";

interface RecentLoanRequestsTableProps {
  loanRequests?: LoanRequest[];
}

const getStatusVariant = (status: string): BadgeVariant => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "active") {
    return "active";
  }

  if (normalizedStatus === "inactive") {
    return "inactive";
  }

  if (normalizedStatus === "pending") {
    return "pending";
  }

  if (normalizedStatus === "blacklisted") {
    return "blacklisted";
  }

  return "inactive";
};

export const RecentLoanRequestsTable: React.FC<RecentLoanRequestsTableProps> = ({
  loanRequests,
}) => {
  const data = useMemo(() => loanRequests ?? [], [loanRequests]);

  const columns = useMemo<ColumnDef<LoanRequest>[]>(
    () => [
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          return <Badge variant={getStatusVariant(status)}>{status}</Badge>;
        },
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "organization",
        header: "Organization",
      },
    ],
    [],
  );

  const { table } = useDataTable({
    data,
    columns,
    pageSize: 7,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 7,
      },
    },
  });

  return (
    <section className={styles.section} aria-label="Recent loan requests">
      <h2 className={styles.sectionTitle}>Recent Loan Requests</h2>

      <DataTable
        table={table}
        className={styles.table}
        showPagination={false}
        emptyMessage="No recent loan requests"
      />
    </section>
  );
};
