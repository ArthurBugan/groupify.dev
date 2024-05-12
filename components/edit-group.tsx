"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import * as z from "zod";

import { FormProvider, useFieldArray, useForm } from "react-hook-form";

const schema = z.object({
  created_at: z.string(),
  icon: z.string(),
  id: z.number(),
  name: z.string().min(2, { message: "Group name is required" }),
  user_id: z.string().uuid(),
  channels: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      thumbnail: z.string(),
      new_content: z.boolean(),
    })
  ),
});

export type Schema = z.infer<typeof schema>;

export function EditGroup() {
  const { ...methods } = useForm<Schema>({
    mode: "onBlur",
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: zodResolver(schema),
  });

  const { fields, append, replace, remove } = useFieldArray({
    keyName: "custom_id",
    control: methods.control,
    name: "channels",
  });

  const onSubmit = async (groupData: Schema) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit size={24} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Group</DialogTitle>
          <DialogDescription>
            Make changes to your group here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <FormProvider {...methods}>
            <form className="flex flex-col gap-y-5">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="name">
                  Name
                </Label>
                <Input
                  className="col-span-3"
                  id="name"
                  value="YouTube Subscriptions"
                  {...methods.register("name")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="updatedAt">
                  Updated At
                </Label>
                <Input
                  className="col-span-3"
                  disabled
                  id="updatedAt"
                  value="2023-05-01"
                />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Thumbnail</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Updated At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>
                        <img
                          alt="Channel Thumbnail"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">Vercel</TableCell>
                      <TableCell>2023-04-01</TableCell>
                      <TableCell>2023-05-01</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <img
                          alt="Channel Thumbnail"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">Shadcn</TableCell>
                      <TableCell>2023-04-01</TableCell>
                      <TableCell>2023-05-01</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>
                        <img
                          alt="Channel Thumbnail"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">Acme Inc</TableCell>
                      <TableCell>2023-04-01</TableCell>
                      <TableCell>2023-05-01</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>
                        <img
                          alt="Channel Thumbnail"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">Groupify</TableCell>
                      <TableCell>2023-04-01</TableCell>
                      <TableCell>2023-05-01</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </form>
          </FormProvider>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
            disabled={methods.formState.isSubmitting}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
