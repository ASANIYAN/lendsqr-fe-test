import React from "react";
import { Badge, DataTable } from "@/components/common";
import type { LoanRequest } from "../utils/types";
import {
  getStatusVariant,
  useRecentLoanRequestsTable,
} from "../hooks/useRecentLoanRequestsTable";
import styles from "./RecentLoanRequestsTable.module.scss";

export interface RecentLoanRequestsTableProps {
  loanRequests?: LoanRequest[];
}

export const RecentLoanRequestsTable: React.FC<RecentLoanRequestsTableProps> = ({
  loanRequests,
}) => {
  const { table } = useRecentLoanRequestsTable({
    loanRequests,
    renderStatus: (status) => (
      <Badge variant={getStatusVariant(status)}>{status}</Badge>
    ),
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
