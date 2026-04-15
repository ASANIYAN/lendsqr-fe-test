import React from "react";
import {
  BadgePercent,
  CircleDollarSign,
  Clock3,
  HandCoins,
  PiggyBank,
  Users,
} from "lucide-react";
import type {
  DashboardMetric,
  DashboardMetricIconVariant,
} from "../utils/types";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import styles from "./DashboardMetrics.module.scss";

interface DashboardMetricsProps {
  metrics?: DashboardMetric[] | null;
}

const metricIconClassMap: Record<DashboardMetricIconVariant, string> = {
  users: styles.iconUsers,
  "active-users": styles.iconActiveUsers,
  loans: styles.iconLoans,
  savings: styles.iconSavings,
  repayment: styles.iconRepayment,
  pending: styles.iconPending,
};

const metricIconCircleClassMap: Record<DashboardMetricIconVariant, string> = {
  users: styles.iconCircleUsers,
  "active-users": styles.iconCircleActiveUsers,
  loans: styles.iconCircleLoans,
  savings: styles.iconCircleSavings,
  repayment: styles.iconCircleRepayment,
  pending: styles.iconCirclePending,
};

const getMetricIcon = (iconVariant: DashboardMetricIconVariant) => {
  switch (iconVariant) {
    case "users":
      return <Users size={20} aria-hidden="true" />;
    case "active-users":
      return <CircleDollarSign size={20} aria-hidden="true" />;
    case "loans":
      return <HandCoins size={20} aria-hidden="true" />;
    case "savings":
      return <PiggyBank size={20} aria-hidden="true" />;
    case "repayment":
      return <BadgePercent size={20} aria-hidden="true" />;
    case "pending":
      return <Clock3 size={20} aria-hidden="true" />;
    default:
      return <Users size={20} aria-hidden="true" />;
  }
};

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  metrics,
}) => {
  const { metricsToRender } = useDashboardMetrics({ metrics });

  return (
    <section className={styles.metricsSection} aria-label="Dashboard metrics">
      <div className={styles.cardsGrid}>
        {metricsToRender.map((metric) => (
          <article key={metric.label} className={styles.metricCard}>
            <div
              className={`${styles.iconCircle} ${metricIconCircleClassMap[metric.iconVariant]}`}
              aria-hidden="true"
            >
              <span className={metricIconClassMap[metric.iconVariant]}>
                {getMetricIcon(metric.iconVariant)}
              </span>
            </div>
            <h2 className={styles.label}>{metric.label}</h2>
            <p className={styles.value}>{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
