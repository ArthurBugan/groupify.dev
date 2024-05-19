import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { del, get } from "@/lib/requests";
import { groups } from "@/lib/signals";
import { TrashIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function DeleteGroup({ formValues }: { formValues: any }) {
  const { toast } = useToast();

  const deleteGroup = async () => {
    await del(`/group/${formValues.id}`);

    const data = await get(`/groups`);
    groups.value = data;

    toast({
      duration: 3000,
      variant: "success",
      title: "Group deleted",
      description: "Keep organizing your channels!",
    });
  };

  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <TrashIcon size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Delete Group</DialogTitle>
          <DialogDescription>
            <p className="text-lg">
              Are you sure you want to delete this group and all its channels?
              This action cannot be undone.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={deleteGroup}>Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
