import React, { useMemo } from "react";
import { AuthLayout } from "@/components/layout";
import {
  DASHBOARD_METRICS,
  RECENT_LOAN_REQUESTS,
} from "../constants/dashboardData";
import { DashboardMetrics, RecentLoanRequestsTable } from "../components";
import styles from "./Dashboard.module.scss";

/**
 * Dashboard is the post-login summary page that shows key loan/user metrics
 * and a compact table of recent loan requests.
 */
export const Dashboard: React.FC = () => {
  const metrics = useMemo(() => DASHBOARD_METRICS, []);
  const loanRequests = useMemo(() => RECENT_LOAN_REQUESTS, []);

  return (
    <AuthLayout>
      <div className={styles.dashboardPage}>
        <h1 className={styles.title}>Dashboard</h1>
        <DashboardMetrics metrics={metrics} />
        <RecentLoanRequestsTable loanRequests={loanRequests} />
      </div>
    </AuthLayout>
  );
};

export default Dashboard;
