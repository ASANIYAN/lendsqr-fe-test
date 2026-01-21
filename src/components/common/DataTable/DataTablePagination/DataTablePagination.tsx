import type { Table } from "@tanstack/react-table";
import styles from "./DataTablePagination.module.scss";
import { PaginationInfo } from "../../PaginationInfo";
import { Pagination } from "../../Pagination";

interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 25, 50, 100],
  className = "",
  ...props
}: DataTablePaginationProps<TData>) {
  const containerClasses = [styles.pagination, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} {...props}>
      <PaginationInfo
        pageSize={table.getState().pagination.pageSize}
        totalItems={table.getFilteredRowModel().rows.length}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={(pageSize) => {
          table.setPageSize(pageSize);
        }}
      />

      <Pagination
        currentPage={table.getState().pagination.pageIndex}
        totalPages={table.getPageCount()}
        onPageChange={(page) => {
          table.setPageIndex(page);
        }}
      />
    </div>
  );
}

export default DataTablePagination;
