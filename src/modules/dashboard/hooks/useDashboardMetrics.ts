import { useMemo } from "react";
import { DASHBOARD_METRICS } from "../constants/dashboardData";
import type { DashboardMetric } from "../utils/types";

interface UseDashboardMetricsParams {
  metrics?: DashboardMetric[] | null;
}

export interface UseDashboardMetricsReturn {
  metricsToRender: DashboardMetric[];
}

export const useDashboardMetrics = ({
  metrics,
}: UseDashboardMetricsParams): UseDashboardMetricsReturn => {
  const fallbackMetrics = useMemo(
    () => DASHBOARD_METRICS.map((metric) => ({ ...metric, value: "—" })),
    [],
  );

  const metricsToRender = useMemo(() => {
    if (!metrics?.length) {
      return fallbackMetrics;
    }

    return metrics.map((metric) => ({
      ...metric,
      value: metric.value || "—",
    }));
  }, [fallbackMetrics, metrics]);

  return { metricsToRender };
};
