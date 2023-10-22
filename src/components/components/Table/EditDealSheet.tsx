import * as React from "react";
import { ReactNode, useState } from "react";
import { Edit2, Loader2 } from "lucide-react";
import { DealData } from "@/components/components/Table/DealData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { useUpdateDeal } from "@/server-cache/useUpdateDeal";

export function EditDealSheet(props: {
  asChild: boolean;
  trigger: ReactNode;
  row: DealData;
}) {
  const { trigger, asChild, row } = props;

  const [isOpen, setIsOpen] = useState(false);

  const updateRowMutation = useUpdateDeal();

  function handleUpdateRow(updatedRow: Record<string, unknown>) {
    updateRowMutation.mutate(
      {
        id: row.id,
        data: updatedRow,
        organizationId: row.organizationId,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        },
      }
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild={asChild}>{trigger}</SheetTrigger>
      <SheetContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const updatedRow = Object.fromEntries(
              Object.keys(row).map((key) => {
                const formField = event.currentTarget[key] as
                  | HTMLInputElement
                  | undefined;
                if (formField == null) {
                  return [key, null];
                }
                return [key, formField.value];
              })
            );

            // TODO: better to patch only the data that changed
            handleUpdateRow(updatedRow);
          }}
        >
          <SheetHeader>
            <SheetTitle>Edit row</SheetTitle>
            <SheetDescription>
              Make changes to your row here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {Object.entries(row).map(([key, value]) => {
              return (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={key} className="text-right">
                    {key}
                  </Label>
                  <Input
                    id={key}
                    name={key}
                    disabled={key === "id" || key === "userId"}
                    defaultValue={String(value)}
                    className="col-span-3"
                  />
                </div>
              );
            })}
          </div>
          <SheetFooter>
            <Button
              variant="ghost"
              type="reset"
              disabled={updateRowMutation.isPending}
            >
              Reset
            </Button>
            <Button type="submit" disabled={updateRowMutation.isPending}>
              {updateRowMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Edit2 className="mr-2 h-4 w-4" />
              )}
              <span>Save changes</span>
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
