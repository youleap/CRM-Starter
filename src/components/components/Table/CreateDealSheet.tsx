import * as React from "react";
import { ReactNode, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Loader2, Save } from "lucide-react";
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
import { useCreateDeal } from "@/server-cache/useCreateDeal";

export function getDealKeys() {
  return [
    "id",
    "userId",
    "organizationId",
    "name",
    "price",
    "discount",
    "description",
  ] as const;
}

export function CreateDealSheet(props: {
  asChild: boolean;
  trigger: ReactNode;
}) {
  const { trigger, asChild } = props;

  const [isOpen, setIsOpen] = useState(false);

  const createRowMutation = useCreateDeal();

  const { userId, orgId } = useAuth();

  function handleCreateRow(data: Omit<DealData, "id">) {
    createRowMutation.mutate(data, {
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
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild={asChild}>{trigger}</SheetTrigger>
      <SheetContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const newRow = Object.fromEntries(
              getDealKeys().map((key) => {
                const formField = event.currentTarget[key] as
                  | HTMLInputElement
                  | undefined;
                if (formField == null) {
                  return [key, null];
                }
                return [key, formField.value];
              })
            );
            if (userId != null && orgId != null) {
              handleCreateRow({ ...newRow, userId, organizationId: orgId });
            }
          }}
        >
          <SheetHeader>
            <SheetTitle>Create row</SheetTitle>
            <SheetDescription>
              Create to your row here. Click create row when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {getDealKeys()
              .filter(
                (key) =>
                  key !== "id" && key !== "userId" && key !== "organizationId"
              )
              .map((key) => {
                return (
                  <div
                    key={key}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label htmlFor={key} className="text-right">
                      {key}
                    </Label>
                    <Input id={key} name={key} className="col-span-3" />
                  </div>
                );
              })}
          </div>
          <SheetFooter>
            <Button
              variant="ghost"
              type="reset"
              disabled={createRowMutation.isPending}
            >
              Reset
            </Button>
            <Button type="submit" disabled={createRowMutation.isPending}>
              {createRowMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              <span>Create Row</span>
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}