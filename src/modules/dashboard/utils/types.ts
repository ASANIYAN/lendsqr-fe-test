export type DashboardMetricIconVariant =
  | "users"
  | "active-users"
  | "loans"
  | "savings"
  | "repayment"
  | "pending";

export interface DashboardMetric {
  iconVariant: DashboardMetricIconVariant;
  label: string;
  value: string;
}

export interface LoanRequest {
  username: string;
  amount: string;
  status: string;
  date: string;
  organization: string;
}
