"use client";
import { useEffect, useState } from "react";

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
  DialogClose,
} from "@/components/ui/dialog";

import { BadgePlus } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ComboboxChannels } from "@/components/ui/combobox-channels";
import { Edit, Trash } from "lucide-react";
import * as z from "zod";

import { FormProvider, set, useFieldArray, useForm } from "react-hook-form";
import { Combobox } from "./ui/combobox";
import { get, post, put } from "@/lib/requests";
import { groups, groups_channels } from "@/lib/signals";

const schema = z.object({
  channel: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
  icon: z.string(),
  name: z.string().min(2, { message: "Group name is required" }),
  channels: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.string().optional(),
      groupId: z.string().optional(),
      updatedAt: z.string().optional(),
      userId: z.string().optional(),
      channelId: z.string(),
      thumbnail: z.string(),
      newContent: z.boolean().optional(),
    })
  ),
});

export type Schema = z.infer<typeof schema>;

let initialValues = {
  icon: "FcFolder",
  createdAt: new Date().toISOString().replace("Z", ""),
  updatedAt: new Date().toISOString().replace("Z", ""),
};

export function EditGroup({
  formValues,
  type,
}: {
  formValues: any;
  type: "add" | "edit";
}) {
  const [open, setOpen] = useState(false);

  const { ...methods } = useForm<Schema>({
    defaultValues: initialValues,
    mode: "onBlur",
    shouldFocusError: false,
    shouldUnregister: false,
    resolver: zodResolver(schema),
  });

  const { fields, append, replace, remove } = useFieldArray({
    keyName: "custom_id",
    control: methods.control,
    name: "channels",
  });

  useEffect(() => {
    methods.reset({ ...initialValues, ...formValues });
    replace(groups_channels.value[formValues.id] || []);

    (async () => {
      const channel = await get(`/channels/${formValues.id}`);
      groups_channels.value[formValues.id] = channel;
    })();
  }, [open]);

  const onSubmit = async (groupData: Schema) => {
    let group: any = {};
    if (type === "add") {
      group = await post("/group", JSON.stringify(groupData), {
        "Content-Type": "application/json",
      });
    } else if (type === "edit") {
      await put(`/group/${groupData.id}`, JSON.stringify(groupData));
    }

    groupData.channels = groupData.channels.map((g) => ({
      ...g,
      newContent: false,
      userId: "",
      groupId: group.id || groupData.id,
    }));

    await put(`/channels/${groupData.id}`, JSON.stringify(groupData.channels));
    const data = await get(`/groups`);
    const channel = await get(`/channels/${groupData.id}`);

    groups.value = data;

    // @ts-ignore
    groups_channels.value[groupData.id] = channel;
    setOpen(false);
  };

  const onInvalid = (invalid: any) => {
    console.log("invalid", invalid);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open} modal={true}>
      <DialogTrigger onClick={() => setOpen(!open)} className="pointer" asChild>
        {type === "add" ? (
          <Button variant="outline">
            <BadgePlus size={24} className="h-4 w-4 mr-2" />{" "}
            <span>New Group</span>
          </Button>
        ) : (
          <Edit size={24} />
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {type === "add" ? "Add Group" : "Edit Group"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your group here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <FormProvider {...methods}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Name
              </Label>
              <Input id="name" {...methods.register("name")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="updatedAt">
                Icon
              </Label>
              <Combobox {...methods.register("icon")} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="updatedAt">
                Add new channel
              </Label>
              <ComboboxChannels
                append={append}
                {...methods.register("channel")}
              />
            </div>

            {fields?.length > 0 && (
              <div className="font-bold text-md">My group channels</div>
            )}

            <div className="flex max-h-60 flex-col gap-y-5 pr-5 overflow-y-auto">
              {fields?.map((c, index) => (
                <div
                  key={c.id}
                  className="flex flex-row w-full items-center justify-between"
                >
                  <img src={c.thumbnail} className="rounded-full h-5 w-5" />
                  <p className="text-sm">{c.name}</p>
                  <Button
                    size="sm"
                    onClick={() => {
                      const values = methods.getValues();

                      console.log({
                        id: c.id,
                        group_id: values.id,
                        userId: values.userId,
                      });
                      return remove(index);
                    }}
                    variant="secondary"
                    type="button"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
            </div>

            <Input className="hidden" id="id" {...methods.register("id")} />
            <Input
              className="hidden"
              id="userId"
              {...methods.register("userId")}
            />
            <Input
              className="hidden"
              id="createdAt"
              {...methods.register("createdAt")}
            />
            <Input
              className="hidden"
              id="updatedAt"
              {...methods.register("updatedAt")}
            />
          </FormProvider>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={methods.handleSubmit(onSubmit, onInvalid)}
              disabled={methods.formState.isSubmitting}
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}