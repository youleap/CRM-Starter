"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { uniq } from "lodash";
import { MoreHorizontal } from "lucide-react";
import { CreateDealSheet } from "@/components/components/Table/CreateDealSheet";
import { DealData } from "@/components/components/Table/DealData";
import { DeleteDealDialog } from "@/components/components/Table/DeleteDealDialog";
import { EditDealSheet } from "@/components/components/Table/EditDealSheet";
import { SortableTableHeaderCell } from "@/components/components/Table/SortableTableHeaderCell";
import { TableColumnSelection } from "@/components/components/Table/TableColumnSelection";
import { TableFooter } from "@/components/components/Table/TableFooter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table as BaseTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    isClickable?: boolean;
  }
}

const selectColumn: ColumnDef<DealData> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      aria-label="Select all"
      onCheckedChange={(value) => {
        table.toggleAllPageRowsSelected(Boolean(value));
      }}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      aria-label="Select deal"
      onCheckedChange={(value) => {
        row.toggleSelected(Boolean(value));
      }}
    />
  ),
  enableSorting: false,
  enableHiding: false,
};

export function DealTable(props: {
  data: Array<DealData>;
  onCellClick: (id: string) => void;
}) {
  const { data, onCellClick } = props;

  const dataKeys = uniq(
    data.flatMap((item) => {
      return Object.keys(item);
    })
  );

  const actionsColumn: ColumnDef<DealData> = {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(row.original.id);
              }}
            >
              Copy id to clipboard
            </DropdownMenuItem>
            <EditDealSheet
              asChild
              row={row.original}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  Edit
                </DropdownMenuItem>
              }
            />
            <DeleteDealDialog
              asChild
              dealId={row.original.id}
              organizationId={row.original.organizationId}
              trigger={
                <DropdownMenuItem
                  className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  Delete
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };

  const columns: Array<ColumnDef<DealData>> = [
    selectColumn,
    ...dataKeys.map<ColumnDef<DealData>>((columnKey) => {
      return {
        accessorKey: columnKey,
        meta: {
          isClickable: true,
        },
        header: ({ column }) => {
          return (
            <SortableTableHeaderCell
              sortStatus={column.getIsSorted()}
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              {columnKey}
            </SortableTableHeaderCell>
          );
        },
      };
    }),
    actionsColumn,
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "auto",
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      globalFilter,
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  function renderBodyContent() {
    return table.getRowModel().rows.length > 0 ? (
      table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? "selected" : null}
        >
          {row.getVisibleCells().map((cell) => {
            const isClickable =
              cell.column.columnDef.meta?.isClickable === true;
            return (
              <TableCell
                key={cell.id}
                className={cn(isClickable && "cursor-pointer")}
                onClick={
                  isClickable
                    ? () => {
                        onCellClick(row.original.id);
                      }
                    : undefined
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  }

  function renderHeaderContent() {
    return table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id}>
              {header.isPlaceholder ? null : (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  {...{
                    className: header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : "",
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              )}
            </TableHead>
          );
        })}
      </TableRow>
    ));
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          className="max-w-sm"
          onChange={(event) => {
            setGlobalFilter(event.target.value);
          }}
        />
        <CreateDealSheet asChild trigger={<Button>Create Row</Button>} />
        <TableColumnSelection table={table} />
      </div>
      <div className="rounded-md border">
        <BaseTable>
          <TableHeader>{renderHeaderContent()}</TableHeader>
          <TableBody>{renderBodyContent()}</TableBody>
        </BaseTable>
      </div>
      <TableFooter table={table} />
    </div>
  );
}