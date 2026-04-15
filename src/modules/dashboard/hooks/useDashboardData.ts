import { DASHBOARD_METRICS, RECENT_LOAN_REQUESTS } from "../constants/dashboardData";

export interface UseDashboardDataReturn {
  metrics: typeof DASHBOARD_METRICS;
  loanRequests: typeof RECENT_LOAN_REQUESTS;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  return {
    metrics: DASHBOARD_METRICS,
    loanRequests: RECENT_LOAN_REQUESTS,
  };
};
