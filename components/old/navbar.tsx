import Link from "next/link";
import ThemeChanger from "./theme-switch";
import MobileNavBar from "./mobile-navbar";

const Navbar = ({ dictionary, showLanguage = true }: any) => {
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo Mobile  */}
        <MobileNavBar showLanguage={showLanguage} dictionary={dictionary} />

        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {dictionary.navigation?.map((menu: any, index: any) => (
              <li className="mr-3 hover: nav__item" key={index}>
                <Link
                  href={"/#" + menu}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu}
                </Link>
              </li>
            ))}
            {dictionary.pages?.map((menu: any, index: any) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={"/" + menu.slug}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
