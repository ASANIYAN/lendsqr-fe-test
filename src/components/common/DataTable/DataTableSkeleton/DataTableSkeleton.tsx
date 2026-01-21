import React from "react";
import styles from "./DataTableSkeleton.module.scss";
import { Skeleton } from "../../Skeleton";

interface DataTableSkeletonProps extends React.ComponentProps<"div"> {
  columnCount: number;
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  withViewOptions?: boolean;
  withPagination?: boolean;
  shrinkZero?: boolean;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 10,
  filterCount = 0,
  cellWidths = ["auto"],
  withViewOptions = true,
  withPagination = true,
  shrinkZero = false,
  className = "",
  ...props
}: DataTableSkeletonProps) {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? "auto",
  );

  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} {...props}>
      {/* Toolbar - Filters and View Options */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {filterCount > 0
            ? Array.from({ length: filterCount }).map((_, i) => (
                <Skeleton key={i} className={styles.filterSkeleton} />
              ))
            : null}
        </div>
        {withViewOptions ? <Skeleton className={styles.viewOptions} /> : null}
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.headerRow}>
              {Array.from({ length: columnCount }).map((_, j) => (
                <th
                  key={j}
                  className={styles.th}
                  style={{
                    width: cozyCellWidths[j],
                    minWidth: shrinkZero ? cozyCellWidths[j] : "auto",
                  }}
                >
                  <Skeleton className={styles.headerSkeleton} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {Array.from({ length: rowCount }).map((_, i) => (
              <tr key={i} className={styles.bodyRow}>
                {Array.from({ length: columnCount }).map((_, j) => (
                  <td
                    key={j}
                    className={styles.td}
                    style={{
                      width: cozyCellWidths[j],
                      minWidth: shrinkZero ? cozyCellWidths[j] : "auto",
                    }}
                  >
                    <Skeleton className={styles.cellSkeleton} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {withPagination ? (
        <div className={styles.pagination}>
          <Skeleton className={styles.paginationInfo} />
          <div className={styles.paginationControls}>
            <div className={styles.pageSize}>
              <Skeleton className={styles.pageSizeLabel} />
              <Skeleton className={styles.pageSizeSelect} />
            </div>
            <div className={styles.pageNumber}>
              <Skeleton className={styles.pageNumberText} />
            </div>
            <div className={styles.pageButtons}>
              <Skeleton className={styles.pageButtonHidden} />
              <Skeleton className={styles.pageButton} />
              <Skeleton className={styles.pageButton} />
              <Skeleton className={styles.pageButtonHidden} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DataTableSkeleton;
