import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";
import styles from "./DataTable.module.scss";
import DataTableSkeleton from "./DataTableSkeleton/DataTableSkeleton";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  isLoading?: boolean;
  onRowClick?: (row: TData) => void | Promise<void>;
  children?: React.ReactNode;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  emptyMessage?: string;
}

export function DataTable<TData>({
  table,
  isLoading = false,
  onRowClick,
  children,
  pageSizeOptions,
  showPagination = true,
  emptyMessage = "No results found.",
  className = "",
  ...props
}: DataTableProps<TData>) {
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={table.getAllColumns().length}
        rowCount={10}
        className={className}
      />
    );
  }

  const handleRowClick = async (row: TData) => {
    if (onRowClick) {
      await onRowClick(row);
    }
  };

  return (
    <div className={containerClasses} {...props}>
      {children}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.headerRow}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.th}>
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
          <tbody className={styles.tbody}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={styles.bodyRow}
                  onClick={() => handleRowClick?.(row.original)}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className={styles.emptyCell}
                >
                  <div className={styles.emptyState}>
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
      )}
    </div>
  );
}

export default DataTable;
