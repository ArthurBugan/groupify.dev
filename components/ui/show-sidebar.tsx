import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import SidebarContent from "./sidebar-content";

export default function ShowSidebar() {
  return (
    <Sheet>
      <div className="flex lg:hidden">
        <SheetTrigger>
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </SheetTrigger>
      </div>
      <SheetContent side="left">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
