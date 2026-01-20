/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./Table.module.scss";

export interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  showSearch?: boolean;
  onRowClick?: (row: T) => void;
  className?: string;
  pageSize?: number;
}

export const Table = <T extends object>({
  data,
  columns,
  showSearch = false,
  onRowClick,
  className = "",
  pageSize = 10,
}: TableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  const tableClasses = [styles.tableContainer, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={tableClasses}>
      {showSearch && (
        <div className={styles.searchContainer}>
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>
      )}

      <div className={styles.tableWrapper}>
        {table.getRowModel().rows?.length ? (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={styles.headerRow}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className={styles.headerCell}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={styles.tableBody}>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={styles.bodyRow}
                  onClick={() => onRowClick?.(row.original)}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.bodyCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
