import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.scss";
import { usePagination } from "./usePagination";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
};

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    { currentPage, totalPages, onPageChange, siblingCount = 1, className = "" },
    ref,
  ) => {
    const {
      pageNumbers,
      isFirstPage,
      isLastPage,
      goToNextPage,
      goToPreviousPage,
      goToPage,
    } = usePagination({
      currentPage,
      totalPages,
      onPageChange,
      siblingCount,
    });

    const containerClasses = [styles.pagination, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={containerClasses}>
        {/* Previous Button */}
        <button
          onClick={goToPreviousPage}
          disabled={isFirstPage}
          className={`${styles.navButton} ${isFirstPage ? styles.disabled : ""}`}
          aria-label="Previous page"
          type="button"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        <div className={styles.pages}>
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`${styles.pageButton} ${isActive ? styles.active : ""}`}
                aria-label={`Page ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
                type="button"
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={isLastPage}
          className={`${styles.navButton} ${isLastPage ? styles.disabled : ""}`}
          aria-label="Next page"
          type="button"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  },
);

Pagination.displayName = "Pagination";

export default Pagination;
