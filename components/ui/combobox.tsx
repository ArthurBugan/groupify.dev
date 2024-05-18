import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { VirtuosoGrid } from "react-virtuoso";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DynamicIcon,
  type Library,
  LibraryIcons,
  returnLibraryIcons,
} from "@/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, getFamily } from "@/lib/utils";

interface ComboboxProps {
  className?: string;
  name: string;
}

let timer: any;
const Combobox: React.FC<ComboboxProps> = ({ name, className }) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>("");

  const itemsCount = React.useMemo(() => {
    if (filter.length > 0) {
      return Object.keys(LibraryIcons)
        .map((framework) =>
          Object.keys(returnLibraryIcons(framework as Library))
        )
        .flat()
        .filter((i) => i.toLowerCase().includes(filter.toLowerCase())).length;
    }

    return Object.keys(LibraryIcons)
      .map((framework) => Object.keys(returnLibraryIcons(framework as Library)))
      .flat().length;
  }, [filter]);

  const items = React.useMemo(() => {
    if (filter.length > 0) {
      return Object.keys(LibraryIcons)
        .map((framework) =>
          Object.keys(returnLibraryIcons(framework as Library))
        )
        .flat()
        .filter((i) => i.toLowerCase().includes(filter.toLowerCase()));
    }

    return Object.keys(LibraryIcons)
      .map((framework) => Object.keys(returnLibraryIcons(framework as Library)))
      .flat();
  }, [filter]);

  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { isSubmitting },
  } = useController({ name });

  return (
    <Popover
      open={open}
      onOpenChange={(isOpened) => {
        setOpen(isOpened);
        setFilter("");
      }}
    >
      <PopoverTrigger className={className} asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between text-primary w-full text-md"
        >
          {field.value ? (
            <p className="flex flex-row items-center justify-center">
              <span className="hidden">{field.value}</span>
              <DynamicIcon
                lib={getFamily(field.value)}
                size={30}
                icon={field.value}
              />
            </p>
          ) : (
            "Icons..."
          )}
          <ChevronsUpDown className="ml-2 h-6 w-6 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[15rem] p-0 bg-primary">
        <Command className="w-full">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-800/40 px-3 text-primary py-2 text-xl ring-offset-background file:border-0 file:bg-transparent file:text-xl file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              clearTimeout(timer);

              timer = setTimeout(() => {
                setFilter(e.target.value);
                clearTimeout(timer);
              }, 500);
            }}
            placeholder="Search icon.."
          />

          <CommandList>
            <CommandEmpty>No icon found...</CommandEmpty>
            <VirtuosoGrid
              className="virtuoso-scroller"
              listClassName="grid grid-cols-4"
              totalCount={itemsCount}
              itemContent={(index) => {
                return (
                  <CommandItem
                    className="w-full justify-center items-center"
                    key={items[index]}
                    title={items[index]}
                    value={items[index]}
                    onSelect={() => {
                      field.onChange(items[index]);
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
                    <DynamicIcon
                      size={36}
                      lib={getFamily(items[index])}
                      icon={items[index]}
                    />
                  </CommandItem>
                );
              }}
            />
          </CommandList>
        </Command>
      </PopoverContent>
      <style>{`
					.command-father > div {
            height: 24rem;
          }
				`}</style>
    </Popover>
  );
};

export { Combobox };
