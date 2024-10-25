"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardMenu = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (document.cookie.includes("auth-token")) {
      setVisible(!visible);
    }
  }, []);

  return (
    <li
      className={`mr-3 nav__item ${!visible ? "hidden" : "block"}`}
      key={"dashbord"}
    >
      <Link
        href={"dashboard/groups"}
        className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
      >
        Dashboard
      </Link>
    </li>
  );
};

export default DashboardMenu;
