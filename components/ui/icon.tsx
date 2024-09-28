import type { IconType } from "react-icons/lib";

import { Icon } from "@iconify-icon/react";

export type IconMap = Record<string, IconType>;

interface IDynamicIcon {
  icon: string;
  size?: number;
  className?: string;
}

export const DynamicIcon: React.FC<IDynamicIcon> = ({ icon }) => {
  return <Icon className={"text-2xl"} icon={icon} />;
};
