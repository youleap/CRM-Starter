import * as React from "react";
import { Table } from "@tanstack/react-table";
import { DealData } from "@/components/components/Table/DealData";
import { TablePagination } from "@/components/components/Table/TablePagination";

export function TableFooter(props: { table: Table<DealData> }) {
  const { table } = props;

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <TablePagination
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        onPrevClick={() => {
          table.previousPage();
        }}
        onNextClick={() => {
          table.nextPage();
        }}
      />
    </div>
  );
}
