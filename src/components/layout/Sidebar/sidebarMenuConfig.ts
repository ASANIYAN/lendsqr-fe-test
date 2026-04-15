import type { MenuSection } from "./sidebar.types";
import dashboardIcon from "@/assets/dashboard.svg";
import usersIcon from "@/assets/users.svg";
import guarantorsIcon from "@/assets/guarantors.svg";
import loansIcon from "@/assets/loans.svg";
import decisionModelsIcon from "@/assets/decision-models.svg";
import savingsIcon from "@/assets/savings.svg";
import loanRequestsIcon from "@/assets/loan-requests.svg";
import whitelistIcon from "@/assets/whitelist.svg";
import karmaIcon from "@/assets/karma.svg";
import organisationIcon from "@/assets/organisation.svg";
import loanProductIcon from "@/assets/loan-product.svg";
import savingsProductIcon from "@/assets/savings-product.svg";
import feesAndChargesIcon from "@/assets/fees-and-charges.svg";
import transactionsIcon from "@/assets/transactions.svg";
import servicesIcon from "@/assets/services.svg";
import serviceAccountIcon from "@/assets/service-acount.svg";
import settlementsIcon from "@/assets/settlements.svg";
import reportsIcon from "@/assets/reports.svg";
import preferencesIcon from "@/assets/preferences.svg";
import feesAndPricingIcon from "@/assets/fees-and-pricing.svg";
import auditLogsIcon from "@/assets/audit-logs.svg";

export const sidebarMenuConfig: MenuSection[] = [
  {
    id: "main",
    label: "",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: dashboardIcon,
        path: "/dashboard",
      },
    ],
  },
  {
    id: "customers",
    label: "CUSTOMERS",
    items: [
      {
        id: "users",
        label: "Users",
        icon: usersIcon,
        path: "/users",
      },
      { id: "guarantors", label: "Guarantors", icon: guarantorsIcon, path: "#" },
      { id: "loans", label: "Loans", icon: loansIcon, path: "#" },
      {
        id: "decision-models",
        label: "Decision Models",
        icon: decisionModelsIcon,
        path: "#",
      },
      { id: "savings", label: "Savings", icon: savingsIcon, path: "#" },
      {
        id: "loan-requests",
        label: "Loan Requests",
        icon: loanRequestsIcon,
        path: "#",
      },
      { id: "whitelist", label: "Whitelist", icon: whitelistIcon, path: "#" },
      { id: "karma", label: "Karma", icon: karmaIcon, path: "#" },
    ],
  },
  {
    id: "businesses",
    label: "BUSINESSES",
    items: [
      {
        id: "organization",
        label: "Organization",
        icon: organisationIcon,
        path: "#",
      },
      {
        id: "loan-products",
        label: "Loan Products",
        icon: loanProductIcon,
        path: "#",
      },
      {
        id: "savings-products",
        label: "Savings Products",
        icon: savingsProductIcon,
        path: "#",
      },
      {
        id: "fees-and-charges",
        label: "Fees and Charges",
        icon: feesAndChargesIcon,
        path: "#",
      },
      {
        id: "transactions",
        label: "Transactions",
        icon: transactionsIcon,
        path: "#",
      },
      { id: "services", label: "Services", icon: servicesIcon, path: "#" },
      {
        id: "service-account",
        label: "Service Account",
        icon: serviceAccountIcon,
        path: "#",
      },
      {
        id: "settlements",
        label: "Settlements",
        icon: settlementsIcon,
        path: "#",
      },
      { id: "reports", label: "Reports", icon: reportsIcon, path: "#" },
    ],
  },
  {
    id: "settings",
    label: "SETTINGS",
    items: [
      {
        id: "preferences",
        label: "Preferences",
        icon: preferencesIcon,
        path: "#",
      },
      {
        id: "fees-and-pricing",
        label: "Fees and Pricing",
        icon: feesAndPricingIcon,
        path: "#",
      },
      {
        id: "audit-logs",
        label: "Audit Logs",
        icon: auditLogsIcon,
        path: "#",
      },
    ],
  },
];
