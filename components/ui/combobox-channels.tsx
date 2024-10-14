"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { v4 } from "uuid";
import {
  type UseFieldArrayAppend,
  useController,
  useFormContext,
} from "react-hook-form";
import { VirtuosoGrid } from "react-virtuoso";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { channels } from "@/lib/signals";
import { useSignalValue } from "signals-react-safe";

interface ComboboxProps {
  append: (param: any) => void;
  name: string;
}

let timer: any;
const ComboboxChannels: React.FC<ComboboxProps> = ({ append, name = "" }) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>("");
  const channel = useSignalValue(channels);

  const formContext = useFormContext();

  const itemsCount = React.useMemo(() => {
    const filterCount = (items: any) => {
      return items.filter(
        (i: any) =>
          i?.name?.toLowerCase().includes(filter.toLowerCase()) ||
          i?.url?.toLowerCase().includes(filter.toLowerCase())
      ).length;
    };

    if (channel == null) {
      if (filter.length > 0) {
        return filterCount(channel);
      }

      // @ts-ignore
      return channel?.length as never;
    }

    if (filter.length > 0) {
      return filterCount(channel);
    }

    return channel.length;
  }, [filter]);

  const items = React.useMemo(() => {
    const filterCount = (items: any) => {
      return items.filter(
        (i: any) =>
          i?.name?.toLowerCase().includes(filter.toLowerCase()) ||
          i?.url?.toLowerCase().includes(filter.toLowerCase())
      );
    };

    const values = channel;

    if (filter.length > 0) {
      return filterCount(values);
    }

    return values;
  }, [filter]);

  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState,
  } = useController({ name });

  if (!formContext || !name) {
    const msg = !formContext
      ? "ComboBox must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  const renderText = () => {
    if (filter.length === 0) {
      return (
        <a
          className="underline"
          href={`https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email%20https://www.googleapis.com/auth/youtube.readonly&client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/auth/google_callback`}
        >
          Link your Youtube account with Groupify to sync all your subscriptions
        </a>
      );
    }

    return "No channel found...";
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpened) => {
        setOpen(isOpened);
        setFilter("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full items-center flex justify-between text-primary text-md"
        >
          {field.value ? (
            <p className="flex flex-row items-center justify-center">
              <span className="hidden">{field.value}</span>
            </p>
          ) : (
            <p className="h-10 flex items-center">Channels...</p>
          )}
          <ChevronsUpDown className="ml-2 h-6 w-6 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[15rem] p-0 bg-primary">
        <Command className="w-full">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-800/40 px-3 text-primary py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-md file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              clearTimeout(timer);

              timer = setTimeout(() => {
                setFilter(e.target.value);
                clearTimeout(timer);
              }, 500);
            }}
            placeholder="Search channels..."
          />

          <CommandList>
            <CommandEmpty>{renderText()}</CommandEmpty>
            <VirtuosoGrid
              overscan={900}
              className="virtuoso-scroller"
              listClassName="grid grid-cols-1 bg-white lg:block dark:bg-gray-800/40"
              totalCount={itemsCount}
              itemContent={(index) => {
                const item = items[index] || null;
                if (item == null) return null;

                return (
                  <CommandItem
                    className="px-4 gap-x-4 w-full flex justify-start items-center"
                    key={item?.id}
                    title={item?.name}
                    onSelect={() => {
                      append({
                        id: v4(),
                        name: item.name,
                        thumbnail: item?.thumbnail,
                        channelId: item.channelId,
                        new_content: item.newContent,
                      });

                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === item
                          ? "opacity-100"
                          : "hidden opacity-0"
                      )}
                    />
                    <img
                      src={item.thumbnail}
                      className="h-10 w-10 rounded-full"
                    />
                    <p>{item?.name}</p>
                  </CommandItem>
                );
              }}
            />
          </CommandList>
        </Command>
      </PopoverContent>
      <style>{`
          .command-father > div {
            height: 21rem;
          }
				`}</style>
    </Popover>
  );
};

export { ComboboxChannels };
