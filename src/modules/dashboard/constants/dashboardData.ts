import type { DashboardMetric, LoanRequest } from "../utils/types";

export const DASHBOARD_METRICS: DashboardMetric[] = [
  { iconVariant: "users", label: "TOTAL USERS", value: "2,453" },
  { iconVariant: "active-users", label: "ACTIVE USERS", value: "2,453" },
  { iconVariant: "loans", label: "ACTIVE LOANS", value: "1,230" },
  { iconVariant: "savings", label: "TOTAL SAVINGS", value: "₦12,500,000" },
  { iconVariant: "repayment", label: "LOAN REPAYMENT RATE", value: "78%" },
  { iconVariant: "pending", label: "PENDING REQUESTS", value: "142" },
];

export const RECENT_LOAN_REQUESTS: LoanRequest[] = [
  {
    username: "Adedeji",
    amount: "₦40,000",
    status: "Active",
    date: "May 15, 2020 10:00 AM",
    organization: "Lendsqr",
  },
  {
    username: "Debby Ogana",
    amount: "₦20,000",
    status: "Pending",
    date: "Apr 30, 2020 10:00 AM",
    organization: "Irorun",
  },
  {
    username: "Grace Effiom",
    amount: "₦150,000",
    status: "Blacklisted",
    date: "Apr 30, 2020 10:00 AM",
    organization: "Lendstar",
  },
  {
    username: "Tosin Dokunmu",
    amount: "₦80,000",
    status: "Inactive",
    date: "Apr 10, 2020 10:00 AM",
    organization: "Lendsqr",
  },
  {
    username: "Emeka Obi",
    amount: "₦55,000",
    status: "Active",
    date: "Mar 20, 2020 10:00 AM",
    organization: "Lendstar",
  },
  {
    username: "Chioma Eze",
    amount: "₦200,000",
    status: "Pending",
    date: "Mar 15, 2020 10:00 AM",
    organization: "Lendsqr",
  },
  {
    username: "Funmi Adeyemi",
    amount: "₦30,000",
    status: "Active",
    date: "Feb 28, 2020 10:00 AM",
    organization: "Irorun",
  },
];
