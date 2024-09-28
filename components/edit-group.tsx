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
import { useToast } from "@/components/ui/use-toast";

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
import { useSignalValue } from "signals-react-safe";
import { Loader } from "./ui/loader";

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
  icon: "twemoji:file-folder",
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
  const { toast } = useToast();
  const group_channel = useSignalValue(groups_channels);

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
    if (Array.isArray(fields) && fields.length > 0) {
      append(groups_channels.value[formValues.id] || []);
    } else {
      replace(groups_channels.value[formValues.id] || []);
    }
  }, [group_channel]);

  useEffect(() => {
    if (open) {
      methods.reset({ ...initialValues, ...formValues });
      replace(groups_channels.value[formValues.id] || []);

      (async () => {
        const channel = await get(`/channels/${formValues.id}`);
        groups_channels.value[formValues.id] = channel;
      })();
    }
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

    let group_id = group.id || groupData.id;

    groupData.channels = groupData.channels.map((g) => ({
      ...g,
      newContent: false,
      userId: "",
      groupId: group_id,
    }));

    if (Array.isArray(groupData.channels) && groupData.channels.length > 0) {
      await put(`/channels/${group_id}`, JSON.stringify(groupData.channels));
      const channel = await get(`/channels/${group_id}`);

      // @ts-ignore
      groups_channels.value[group_id] = channel;
    }

    const data = await get(`/groups`);
    groups.value = data;

    setOpen(false);

    toast({
      duration: 3000,
      variant: "success",
      title: "Group saved",
      description: "Keep organizing your channels!",
    });
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
          <Button variant="outline">
            <Edit size={24} />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="sm:max-w-[800px]"
      >
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
                  <img src={c.thumbnail} className="rounded-full h-10 w-10" />
                  <p className="text-sm">{c.name}</p>
                  <Button
                    size="sm"
                    onClick={() => {
                      const values = methods.getValues();
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
              {methods.formState.isSubmitting ? (
                <>
                  {" "}
                  <p className="text-sm">Please wait...</p> <Loader />
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
