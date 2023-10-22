import * as React from "react";
import {ReactNode, useState} from "react";
import {Loader2, Trash} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {useToast} from "@/components/ui/use-toast";
import {useDeleteDeal} from "@/server-cache/useDeleteDeal";

export function DeleteDealDialog(props: {
  dealId: string;
  asChild?: boolean;
  trigger: ReactNode;
  organizationId: string;
  onDeleteSuccess?: () => void;
}) {
  const { toast } = useToast();

  const { trigger, asChild, dealId, organizationId, onDeleteSuccess } = props;

  const [isOpen, setIsOpen] = useState(false);

  const deleteDealMutation = useDeleteDeal();

  function handleDeleteDeal() {
    deleteDealMutation.mutate(
        {dealId, organizationId},
        {
          onSuccess: () => {
            setIsOpen(false);
            onDeleteSuccess?.();
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
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild={asChild}>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this row?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 focus:ring-red-600"
            onClick={(event) => {
              event.preventDefault();
              handleDeleteDeal();
            }}
          >
            {deleteDealMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
