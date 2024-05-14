import { signal } from "signals-react-safe";
import { Library, LibraryIcons, returnLibraryIcons } from "@/components/ui/icon";

const channels = signal([]);

const icons = signal(Object.keys(LibraryIcons)
  .map((framework) =>
    Object.keys(returnLibraryIcons(framework as Library))
  )
  .flat())

export { channels, icons }