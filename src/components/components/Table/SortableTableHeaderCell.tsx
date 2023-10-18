import * as React from "react";
import { SortDirection } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SortableTableHeaderCell(props: {
  onClick: () => void;
  children: string;
  sortStatus: false | SortDirection;
}) {
  const { sortStatus, children, onClick } = props;

  return (
    <Button variant="ghost" onClick={onClick}>
      {children}
      {sortStatus === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : null}
      {sortStatus === "desc" ? <ArrowDown className="ml-2 h-4 w-4" /> : null}
      {sortStatus === false ? <ArrowUpDown className="ml-2 h-4 w-4" /> : null}
    </Button>
  );
}
