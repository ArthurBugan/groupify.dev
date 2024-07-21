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

import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { del } from "@/lib/requests";
import { useToast } from "@/components/ui/use-toast";

export function DeleteAccount() {
  const { toast } = useToast();

  const deleteAccount = async () => {
    await del("/account");

    toast({
      duration: 3000,
      variant: "success",
      title: "Account delete",
      description: "Thank you for using it!",
    });

    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    setTimeout(() => {
      location.href = "https://groupify.dev";
    }, 3000);
  };

  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>
        <DropdownMenuLabel>Delete my account</DropdownMenuLabel>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            <p className="text-lg">
              Are you sure you want to delete your account and ALL your data?
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={deleteAccount}>Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
