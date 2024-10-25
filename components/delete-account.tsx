"use client";

import { useState } from "react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { del, post } from "@/lib/requests";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";
import { Delete, Trash2 } from "lucide-react";
import { Loader } from "./ui/loader";

const schema = z.object({
  surveyText: z.string().min(2, { message: "Reason is required" }),
});

export type Schema = z.infer<typeof schema>;

function Errors(props: { errors?: string[] }) {
  if (!props.errors?.length) return null;
  return (
    <div>
      {props.errors.map((err) => (
        <p className="text-red-400">{err}</p>
      ))}
    </div>
  );
}

export function DeleteAccount() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    await post("/add-survey", JSON.stringify({ ...data }), {
      "Content-Type": "application/json",
    });

    deleteAccount();
  };

  const deleteAccount = async () => {
    await del("/account");

    toast({
      duration: 3000,
      variant: "success",
      title: "Account deleted",
      description: "Thank you for using it - Feel free to return anytime!",
    });

    await post("/logout", {});
    setLoading(false);

    await new Promise((r) => setTimeout(r, 3000));
    location.reload();
  };

  const result = schema.safeParse(form.getValues());

  const errors: any = result.success ? {} : result.error.format();

  return (
    <FormProvider {...form}>
      <Dialog modal={true}>
        <DialogTrigger asChild>
          <Trash2 className="cursor-pointer" size={14} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription className="space-y-4">
              <>
                <p className="text-md">
                  Are you sure you want to delete your account and ALL your
                  data?
                </p>

                <div>
                  <Label htmlFor="surveyText">Give a feedback:</Label>
                  <Input
                    required
                    id="surveyText"
                    type="surveyText"
                    {...form.register("surveyText")}
                  />
                  <Errors errors={errors?.surveyText?._errors} />
                </div>
              </>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button
              onClick={async () => {
                await form.trigger(); // Manually triggers form or input validation
                if (form.formState.isValid) onSubmit(form.getValues()); // Call the `onSubmit` function if the form is validated
              }}
              type="submit"
            >
              {loading ? <Loader /> : <span>Delete</span>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
