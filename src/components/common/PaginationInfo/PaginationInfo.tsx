import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./PaginationInfo.module.scss";
import { useIsMobile } from "@/hooks/useIsMobile";

export type PaginationInfoProps = {
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: number[];
  onPageSizeChange: (pageSize: number) => void;
  className?: string;
};

export const PaginationInfo = React.forwardRef<
  HTMLDivElement,
  PaginationInfoProps
>(
  (
    {
      pageSize,
      totalItems,
      pageSizeOptions = [10, 25, 50, 100],
      onPageSizeChange,
      className = "",
    },
    ref,
  ) => {
    const isMobile = useIsMobile();

    const handlePageSizeChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const newPageSize = Number(event.target.value);
      onPageSizeChange(newPageSize);
    };

    const containerClasses = [styles.paginationInfo, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={containerClasses}>
        <span className={styles.text}>{isMobile ? "Show" : "Showing"}</span>

        <div className={styles.selectWrapper}>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className={styles.select}
            aria-label="Items per page"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className={styles.icon} size={14} aria-hidden="true" />
        </div>

        <span className={styles.text}>
          {isMobile
            ? `of ${totalItems.toLocaleString()}`
            : `out of ${totalItems.toLocaleString()}`}
        </span>
      </div>
    );
  },
);

PaginationInfo.displayName = "PaginationInfo";

export default PaginationInfo;
