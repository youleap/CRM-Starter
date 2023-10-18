import * as React from "react";
import { Button } from "@/components/ui/button";

export function TablePagination(props: {
  onPrevClick: () => void;
  onNextClick: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}) {
  const { onNextClick, onPrevClick, canNextPage, canPreviousPage } = props;

  return (
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={!canPreviousPage}
        onClick={onPrevClick}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={!canNextPage}
        onClick={onNextClick}
      >
        Next
      </Button>
    </div>
  );
}
