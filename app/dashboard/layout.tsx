import {
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import ThemeChanger from "@/components/old/theme-switch";
import { DeleteAccount } from "@/components/delete-account";

import { Button } from "@/components/ui/button";

import UseClient from "@/components/ui/use-client";

import HeaderDropdown from "@/components/ui/header-dropdown";
import SidebarContent from "@/components/ui/sidebar-content";
import ShowSidebar from "@/components/ui/show-sidebar";

export default function WithMobileSidebar({
  children,
  mobileDashboardHeader: MobileDashboardHeader,
}: {
  children: React.ReactNode;
  sidebarContent: () => JSX.Element;
  mobileDashboardHeader?: () => JSX.Element;
}) {
  return (
    <>
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block border-r bg-gray-100/40 dark:bg-gray-800/40">
          <SidebarContent />
        </div>

        <div className="flex flex-col w-screen lg:w-auto">
          <>
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
              <UseClient>
                <ShowSidebar />
              </UseClient>
              <div className="w-full flex-1"></div>
              <ThemeChanger />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                    size="icon"
                    variant="ghost"
                  >
                    <svg
                      width="200"
                      height="200"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="100" cy="100" r="90" fill="#F9E3C0" />
                      <circle cx="100" cy="80" r="60" fill="#F2C78D" />
                      <circle cx="80" cy="70" r="8" fill="#231F20" />
                      <circle cx="120" cy="70" r="8" fill="#231F20" />
                      <path
                        d="M 80 100 Q 100 120 120 100"
                        fill="none"
                        stroke="#231F20"
                        strokeWidth="4"
                      />
                      <rect
                        x="80"
                        y="110"
                        width="40"
                        height="60"
                        fill="#F2C78D"
                      />
                      <rect
                        x="60"
                        y="110"
                        width="20"
                        height="40"
                        fill="#F2C78D"
                      />
                      <rect
                        x="120"
                        y="110"
                        width="20"
                        height="40"
                        fill="#F2C78D"
                      />
                      <rect
                        x="85"
                        y="170"
                        width="15"
                        height="30"
                        fill="#F2C78D"
                      />
                      <rect
                        x="100"
                        y="170"
                        width="15"
                        height="30"
                        fill="#F2C78D"
                      />
                    </svg>

                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <UseClient>
                  <HeaderDropdown />
                </UseClient>
              </DropdownMenu>
              <UseClient>
                <DeleteAccount />
              </UseClient>
            </header>
            {children}
          </>
        </div>
      </div>
    </>
  );
}
