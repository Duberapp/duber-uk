import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Bars3CenterLeftIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useUser } from "@supabase/auth-helpers-react";
import { LoginButton, SignupButton, DashboardButton } from "./AuthButtons";

const Navbar = ({ constructionMode }) => {
  const [nav, setNav] = useState(false);
  const user = useUser();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full z-10 ease-in duration-300 bg-white text-navyBlue">
      <div className="max-w-[1190px] m-auto flex justify-between items-center px-4 py-8 text-base font-semibold">
        {/* Logo */}
        <div className="w-40 hover:cursor-pointer flex justify-center">
          <Link href="/">
            <Image
              src="/assets/Duber logo.svg"
              width={181}
              height={50}
              objectFit="Cover"
              alt="Duber Logo"
            />
          </Link>
        </div>
        <nav>
          <ul className="hidden sm:flex items-center gap-x-10">
            {!constructionMode && (
              <li className="hover:text-primaryBlue">
                <Link href="/hire">Book Now</Link>
              </li>
            )}
            <li className="hover:text-primaryBlue">
              <Link href="/#FAQs">FAQs</Link>
            </li>
            <li className="hover:text-primaryBlue">
              <Link href="/contact">Contact</Link>
            </li>
            <li className="hover:text-primaryBlue">
              <Link href="/duberpilots">Become a Pilot</Link>
            </li>
            {!user ? (
              <div className="flex items-center gap-x-3 -ml-2">
                <LoginButton />
                <SignupButton />
              </div>
            ) : (
              <DashboardButton />
            )}
          </ul>
        </nav>

        {/* Mobile Button */}
        <div className="flex sm:hidden z-50 items-center">
          {!nav && (
            <>
              {!user ? (
                <div className="flex items-center gap-x-2 ">
                  <LoginButton />
                  <SignupButton />
                </div>
              ) : (
                <DashboardButton />
              )}
            </>
          )}
          <div onClick={handleNav}>
            {nav ? (
              <div className="p-2 rounded-md bg-primaryTealLight">
                <Bars3Icon className="w-6 h-6 fixed right-6 top-11" />
              </div>
            ) : (
              <div className="ml-3 p-2 rounded-md bg-primaryTealLight">
                <Bars3CenterLeftIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-primaryTealLight text-center ease-in duration-300 z-40"
              : "sm:hidden fixed top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-primaryTealLight text-center ease-in duration-300 z-40"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/hire">Book Now</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="#FAQs">FAQ</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/contact">Contact</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/duberpilots">Become a Pilot</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
