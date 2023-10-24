"use client";

import { pathFor } from "@nirtamir2/next-static-paths";
import { Edit2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDealKeys } from "@/components/components/Table/CreateDealSheet";
import { DealData } from "@/components/components/Table/DealData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useDeal } from "@/server-cache/useDeal";
import { useUpdateDeal } from "@/server-cache/useUpdateDeal";

export function isDisabledKey(key: string) {
  return key === "id" || key === "userId" || key === "organizationId";
}

export function EditDeal(props: { dealId: string; organizationId: string }) {
  const { dealId, organizationId } = props;

  const dealQuery = useDeal({ id: dealId, organizationId });
  const router = useRouter();

  const updateDealMutation = useUpdateDeal();

  function handleUpdateDeal(updatedRow: DealData) {
    updateDealMutation.mutate(
      {
        id: dealId,
        data: updatedRow,
        organizationId,
      },
      {
        onSuccess: () => {
          router.push(pathFor("/deals"));
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

  if (dealQuery.isPending) {
    return "Loading";
  }
  if (dealQuery.isError) {
    return <div>{dealQuery.error.message}</div>;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const updatedRow = Object.fromEntries(
          getDealKeys().map((key) => {
            const formField = event.currentTarget[key] as
              | HTMLInputElement
              | undefined;
            if (formField == null) {
              return [key, null];
            }
            return [key, formField.value];
          })
        ) as unknown as DealData;

        // TODO: better to patch only the data that changed
        handleUpdateDeal(updatedRow);
      }}
    >
      <div className="grid gap-4 py-4">
        {Object.entries(dealQuery.data).map(([key, value]) => {
          return (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {key}
              </Label>
              <Input
                id={key}
                name={key}
                disabled={isDisabledKey(key)}
                defaultValue={String(value)}
                className="col-span-3"
              />
            </div>
          );
        })}
      </div>
      <footer>
        <Button
          variant="ghost"
          type="reset"
          disabled={updateDealMutation.isPending}
        >
          Reset
        </Button>
        <Button type="submit" disabled={updateDealMutation.isPending}>
          {updateDealMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Edit2 className="mr-2 h-4 w-4" />
          )}
          <span>Save changes</span>
        </Button>
      </footer>
    </form>
  );
}
