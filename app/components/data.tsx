import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  ShareIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

const benefitOne = {
  title: "Automatically sync your collections on any browser",
  desc: "Never lose a channel that you subscribe again, now you can organize them into quick to acess groups and in the future share them to your friends",
  image: "/images/benefit-one.svg",
  bullets: [
    {
      title: "Add a custom icon to your YouTube collections",
      desc: "Enhance the context of your groups by utilizing our extensive library of icons.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Improve organization",
      desc: "Discover a centralized hub for all your content needs as you open YouTube.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Share with your friends",
      desc: "Share your groups with the world through easily shareable links, enabling others to clone or collaborate on them.",
      icon: <ShareIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Easy to use and Dark & Light Mode",
  desc: "Organizing your subscriptions has never been easier with our 100% free and limitless browser extension. Say goodbye to worrying about the number of channels you have to manage, as we've got you covered.",
  image: "/images/benefit-two.svg",
  bullets: [
    {
      title: "Great UI and UX",
      desc: "Groupify is meticulously designed to provide you with the finest UI/UX experience possible.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by React & TailwindCSS",
      desc: "We constantly leverage cutting-edge technologies and maintain a relentless pursuit of improvements.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Groupify offers both light and dark modes that automatically adapt to your system configuration. ",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
