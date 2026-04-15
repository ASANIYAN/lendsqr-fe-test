import { useMemo } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface UsePaginationParams {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount: number;
}

export interface UsePaginationReturn {
  pageNumbers: Array<number | string>;
  isFirstPage: boolean;
  isLastPage: boolean;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
}

const createPageNumbers = ({
  currentPage,
  totalPages,
  siblingCount,
  isMobile,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
  isMobile: boolean;
}) => {
  const responsiveSiblingCount = isMobile ? 0 : siblingCount;
  const totalPageNumbers = responsiveSiblingCount + 5;

  if (isMobile && totalPages > 5) {
    const current = currentPage + 1;

    if (current <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (current >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", current, "...", totalPages];
  }

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage + 1 - responsiveSiblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + 1 + responsiveSiblingCount,
    totalPages,
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * responsiveSiblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * responsiveSiblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );

    return [firstPageIndex, "...", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );

    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }

  return [];
};

export const usePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount,
}: UsePaginationParams): UsePaginationReturn => {
  const isMobile = useIsMobile();

  const pageNumbers = useMemo(
    () =>
      createPageNumbers({
        currentPage,
        totalPages,
        siblingCount,
        isMobile,
      }),
    [currentPage, totalPages, siblingCount, isMobile],
  );

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    onPageChange(page - 1);
  };

  return {
    pageNumbers,
    isFirstPage: currentPage === 0,
    isLastPage: currentPage === totalPages - 1,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  };
};
