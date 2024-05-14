"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
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

interface ComboboxProps {
  append: (param: any) => void;
  name: string;
}

let timer: any;
const ComboboxChannels: React.FC<ComboboxProps> = ({ append, name = "" }) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>("");
  const formContext = useFormContext();

  const itemsCount = React.useMemo(() => {
    const filterCount = (items: any) => {
      return items.filter((i: any) =>
        i.guideEntryRenderer.formattedTitle.simpleText
          .toLowerCase()
          .includes(filter.toLowerCase())
      ).length;
    };

    if (channels.value == null) {
      if (filter.length > 0) {
        return filterCount(channels.value);
      }

      // @ts-ignore
      return channels.value?.length as never;
    }

    const values = channels.value;
    values.pop();

    if (filter.length > 0) {
      return filterCount(values);
    }

    return values.length;
  }, [filter]);

  const items = React.useMemo(() => {
    const filterCount = (items: any) => {
      return items.filter((i: any) =>
        i.guideEntryRenderer.formattedTitle.simpleText
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    };

    const values = channels.value;

    values.pop();

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
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 text-primary py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-md file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <CommandEmpty>No channel found...</CommandEmpty>
            <VirtuosoGrid
              className="virtuoso-scroller"
              listClassName="grid grid-cols-1"
              totalCount={itemsCount}
              itemContent={(index) => {
                const item = items[index]?.guideEntryRenderer || null;
                if (item == null) return null;

                return (
                  <CommandItem
                    className="px-4 gap-x-4 w-full flex justify-start items-center"
                    key={item?.entryData?.guideEntryData?.guideEntryId}
                    title={item?.formattedTitle?.simpleText}
                    onSelect={() => {
                      append({
                        id: item.entryData.guideEntryData.guideEntryId,
                        name: item.formattedTitle?.simpleText,
                        thumbnail: item?.thumbnail?.thumbnails[0].url,
                        new_content:
                          item.presentationStyle ===
                          "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT",
                      });

                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === items[index]
                          ? "opacity-100"
                          : "hidden opacity-0"
                      )}
                    />
                    <img
                      src={item?.thumbnail?.thumbnails[0].url}
                      className="h-10 w-10 rounded-full"
                    />
                    <p>{item?.formattedTitle?.simpleText}</p>
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
