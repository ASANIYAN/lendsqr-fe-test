import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type TableState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";

interface UseDataTableProps<TData> extends Omit<
  TableOptions<TData>,
  | "state"
  | "getCoreRowModel"
  | "manualFiltering"
  | "manualPagination"
  | "manualSorting"
> {
  initialState?: Partial<TableState>;
  pageSize?: number;
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const { data, columns, initialState, pageSize = 10, ...tableProps } = props;

  // Row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    initialState?.rowSelection ?? {},
  );

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState?.columnVisibility ?? {},
  );

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: initialState?.pagination?.pageSize ?? pageSize,
  });

  // Sorting state
  const [sorting, setSorting] = useState<SortingState>(
    initialState?.sorting ?? [],
  );

  // Column filters state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState?.columnFilters ?? [],
  );

  // Global filter state
  const [globalFilter, setGlobalFilter] = useState<string>(
    initialState?.globalFilter ?? "",
  );

  const table = useReactTable({
    ...tableProps,
    data,
    columns,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableRowSelection: true,
    globalFilterFn: "includesString",
  });

  return useMemo(() => ({ table }), [table]);
}
