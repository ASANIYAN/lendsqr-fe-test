import { useMemo, type ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDataTable } from "@/hooks/useDataTable";
import type { BadgeVariant } from "@/components/common/Badge/Badge";
import type { LoanRequest } from "../utils/types";

interface UseRecentLoanRequestsTableParams {
  loanRequests?: LoanRequest[];
  renderStatus: (status: string) => ReactNode;
}

export interface UseRecentLoanRequestsTableReturn {
  table: ReturnType<typeof useDataTable<LoanRequest>>["table"];
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

export const useRecentLoanRequestsTable = ({
  loanRequests,
  renderStatus,
}: UseRecentLoanRequestsTableParams): UseRecentLoanRequestsTableReturn => {
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
        cell: ({ row }) => renderStatus(row.original.status),
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
    [renderStatus],
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

  return { table };
};

export { getStatusVariant };
