import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="2xl:max-w-screen-xl lg:max-w-screen-lg container w-full h-full sm:mx-auto mx-0 lg:px-0 px-5 mb-10">
      <div className="mt-5 flex justify-between">
        {/* Logo */}
        <div className="w-32 flex justify-center cursor-pointer">
          <Link href="/">
            <Image
              src="/assets/Duber logo.svg"
              alt="logo"
              width={128}
              height={35}
            />
          </Link>
        </div>
        <div>
          <Link href="/dashboard">
            <UserCircleIcon className="h-10 w-10 text-navyBlue cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="sm:mt-16 mt-7">{children}</div>
    </div>
  );
};

export default MainLayout;
