import React, { useState, useEffect } from "react";
import {
  ClockIcon,
  CommandLineIcon,
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  CurrencyPoundIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser, selectUser } from "../../config/supabaseFunctions";
import { useUser } from "@supabase/auth-helpers-react";
import { Toaster } from "react-hot-toast";
import { errorToast } from "./UI/Toast";
import { LoadingSpinner } from "./index";

const DashboardLayout = ({ title, children, setData, parentLoading }) => {
  const router = useRouter();
  const user = useUser();
  const currentRoute = router.pathname;

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [navItems, setNavItems] = useState([
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <HomeIcon className="w-5 h-5 sm:w-7 sm:h-7" />,
      key: 1,
    },
    {
      title: "Order History",
      path: "/dashboard/order-history",
      icon: <ClockIcon className="w-5 h-5 sm:w-7 sm:h-7" />,
      key: 2,
    },
    {
      title: "My Account",
      path: "/dashboard/my-account",
      icon: <UserIcon className="w-5 h-5 sm:w-7 sm:h-7" />,
      key: 3,
    },
  ]);

  // Initialize User Data
  useEffect(() => {
    const initializeData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data: userDataRes, error: userDataResErr } = await selectUser(
          user.id
        );
        if (userDataResErr) throw new Error("Failed to fetch user data");

        if (userDataRes.length === 0) {
          setUserData({});
          setData && setData({});
        } else {
          setUserData(userDataRes[0]);
          setData && setData(userDataRes[0]);
        }
        setLoading(false);
      } catch (err) {
        errorToast(err.message);
        setLoading(false);
      }
    };

    initializeData();
  }, [user]);

  useEffect(() => {
    if (userData.isAdmin) setIsAdmin(true);
  }, [userData]);

  const handleLogout = async () => {
    try {
      const { error } = await logoutUser();
      if (error) throw error;

      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        {/*SideNavBar*/}
        <div className="md:w-[280px] md:max-h-[645px] md:min-h-[645px] shrink-0 bg-navyBlue rounded-xl p-4 sm:p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex flex-row justify-between">
              <div>
                {userData.firstName && (
                  <p className="text-base sm:text-xl text-white font-semibold">
                    Hey {userData?.firstName}
                    <br />
                    <span className="font-light">Welcome Back</span>
                  </p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="md:hidden text-sm sm:text-base px-5 py-3 bg-red-100 text-red-400 text-center my-auto rounded-md"
              >
                Log Out
              </button>
            </div>
            <div>
              <nav className="flex justify-between md:justify-start md:flex-col">
                {navItems.map((navItem) => (
                  <Link key={navItem.key} href={navItem.path}>
                    <div
                      key={navItem.path}
                      className={
                        currentRoute === navItem.path
                          ? "flex space-x-3 sm:space-x-4 text-xs sm:text-base text-primaryTeal sm:text-white hover:text-primaryPink py-3 cursor-pointer"
                          : "flex space-x-3 sm:space-x-4 text-xs sm:text-base text-white hover:text-primaryPink py-3 cursor-pointer"
                      }
                    >
                      <div
                        className={
                          currentRoute === navItem.path
                            ? "sm:min-w-[7px] bg-primaryTeal rounded-lg"
                            : "sm:min-w-[7px] bg-navyBlue rounded-lg"
                        }
                      ></div>
                      {navItem.icon}
                      <p className="my-auto">{navItem.title}</p>
                    </div>
                  </Link>
                ))}
                <Link href="/dashboard/ai-reporter">
                  <div
                    className={
                      currentRoute === "/dashboard/ai-reporter"
                        ? "hidden max-w-0 md:max-w-full md:flex space-x-3 sm:space-x-4 text-xs sm:text-base text-primaryTeal sm:text-white hover:text-primaryPink py-3 cursor-pointer"
                        : "hidden max-w-0 md:max-w-full md:flex space-x-3 sm:space-x-4 text-xs sm:text-base text-white hover:text-primaryPink py-3 cursor-pointer"
                    }
                  >
                    <div
                      className={
                        currentRoute === "/dashboard/ai-reporter"
                          ? "sm:min-w-[7px] bg-primaryTeal rounded-lg"
                          : "sm:min-w-[7px] bg-navyBlue rounded-lg"
                      }
                    ></div>
                    <CommandLineIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                    <p className="my-auto">AI Reporter</p>
                  </div>
                </Link>
                {isAdmin && (
                  <>
                    <Link href="/dashboard/referral-requests">
                      <div
                        className={
                          currentRoute === "/dashboard/referral-requests"
                            ? "hidden max-w-0 md:max-w-full md:flex space-x-3 sm:space-x-4 text-xs sm:text-base text-primaryTeal sm:text-white hover:text-primaryPink py-3 cursor-pointer"
                            : "hidden max-w-0 md:max-w-full md:flex space-x-3 sm:space-x-4 text-xs sm:text-base text-white hover:text-primaryPink py-3 cursor-pointer"
                        }
                      >
                        <div
                          className={
                            currentRoute === "/dashboard/referral-requests"
                              ? "sm:min-w-[7px] bg-primaryTeal rounded-lg"
                              : "sm:min-w-[7px] bg-navyBlue rounded-lg"
                          }
                        ></div>
                        <UserGroupIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                        <p className="my-auto">Referral Requests</p>
                      </div>
                    </Link>
                    <Link href="/dashboard/payment-settings">
                      <div
                        className={
                          currentRoute === "/dashboard/payment-settings"
                            ? "hidden max-w-0 md:max-w-full md:flex space-x-3 sm:space-x-4 text-xs sm:text-base text-primaryTeal sm:text-white hover:text-primaryPink py-3 cursor-pointer"
                            : "hidden max-w-0 md:max-w-full md:flex space-x-3 sm:space-x-4 text-xs sm:text-base text-white hover:text-primaryPink py-3 cursor-pointer"
                        }
                      >
                        <div
                          className={
                            currentRoute === "/dashboard/payment-settings"
                              ? "sm:min-w-[7px] bg-primaryTeal rounded-lg"
                              : "sm:min-w-[7px] bg-navyBlue rounded-lg"
                          }
                        ></div>
                        <CurrencyPoundIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                        <p className="my-auto">Payment Settings</p>
                      </div>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="hidden md:block text-center text-red-400 p-2 cursor-pointer"
          >
            <p>Log Out</p>
          </button>
        </div>
        {/*Page title & Page Content*/}
        <div className="w-full">
          <div className="pb-3">
            <h1 className="text-xl sm:text-2xl text-navyBlue font-semibold">
              {title}
            </h1>
          </div>
          {Object.keys(userData) === 0 ? (
            <div className="w-full h-full flex items-center justify-center">{`Something went wrong !`}</div>
          ) : loading || parentLoading ? (
            <div className="w-full h-full flex items-start mt-12 justify-center">
              <div className="p-2 bg-white flex items-center justify-center rounded-full custom-shadow">
                <LoadingSpinner width={7} height={7} color="navyBlue" />
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
