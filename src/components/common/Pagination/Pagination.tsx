import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.scss";

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
    // Generate array of page numbers to display
    const getPageNumbers = (): (number | string)[] => {
      const totalPageNumbers = siblingCount + 5; // First, last, current, and siblings

      // Show all pages if total is small
      if (totalPages <= totalPageNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const leftSiblingIndex = Math.max(currentPage + 1 - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + 1 + siblingCount,
        totalPages,
      );

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      // No left dots, but right dots
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = Array.from(
          { length: leftItemCount },
          (_, i) => i + 1,
        );
        return [...leftRange, "...", totalPages];
      }

      // Left dots, but no right dots
      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + i + 1,
        );
        return [firstPageIndex, "...", ...rightRange];
      }

      // Both left and right dots
      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i,
        );
        return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
      }

      return [];
    };

    const pageNumbers = getPageNumbers();

    const handlePrevious = () => {
      if (currentPage > 0) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages - 1) {
        onPageChange(currentPage + 1);
      }
    };

    const handlePageClick = (page: number) => {
      onPageChange(page - 1); // Convert to 0-indexed
    };

    const containerClasses = [styles.pagination, className]
      .filter(Boolean)
      .join(" ");

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    return (
      <div ref={ref} className={containerClasses}>
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
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
                onClick={() => handlePageClick(pageNumber)}
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
          onClick={handleNext}
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
