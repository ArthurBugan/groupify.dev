import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useController } from "react-hook-form";
import { VirtuosoGrid } from "react-virtuoso";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icon } from "@iconify-icon/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ComboboxProps {
  className?: string;
  name: string;
}

let timer: any;
const Combobox: React.FC<ComboboxProps> = ({ name, className }) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>("");
  const [items, setItems] = React.useState<string[]>([]);

  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { isSubmitting },
  } = useController({ name });

  React.useEffect(() => {
    (async () => {
      const resp = await (
        await fetch(
          `https://api.iconify.design/collection?prefix=twemoji&chars=true&aliases=true`
        )
      ).json();

      setItems(
        Object.values(resp?.categories)
          .flat()
          .map((i) => "twemoji:" + i)
      );
    })();
  }, []);

  const parentRef = React.useRef(null);

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
              <Icon icon={field.value} className="text-3xl" />
            </p>
          ) : (
            "Icons..."
          )}
          <ChevronsUpDown className="ml-2 h-6 w-6 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[15rem] p-0 bg-primary">
        <Command className="w-full" ref={parentRef}>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-800/40 px-3 text-primary py-2 text-xl ring-offset-background file:border-0 file:bg-transparent file:text-xl file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={async (e) => {
              clearTimeout(timer);

              timer = setTimeout(async () => {
                setFilter(e.target.value);
                clearTimeout(timer);

                const resp = await (
                  await fetch(
                    `https://api.iconify.design/search?query=${e.target.value}&limit=200`
                  )
                ).json();
                setItems(resp?.icons);
              }, 500);
            }}
            placeholder="Search icon.."
          />

          <CommandList>
            <>
              <CommandEmpty>No icon found...</CommandEmpty>
              <VirtuosoGrid
                className="virtuoso-scroller"
                listClassName="grid grid-cols-4"
                totalCount={items.length}
                overscan={555}
                itemContent={(index) => (
                  <CommandItem
                    className="w-full justify-center items-center h-6 mt-4"
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
                    <Icon className="text-3xl" noobserver icon={items[index]} />
                  </CommandItem>
                )}
              />
            </>
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
