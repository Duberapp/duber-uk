import React from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const AffiliateCard = ({ status, referralLink, setModalShow }) => {
  return (
    <div className="">
      <div className="p-3 bg-[#2F51B4] shadow-lg shadow-[#2f50b459] rounded-md w-full flex flex-col">
        <div className=" flex items-center justify-between">
          {status !== "registered" ? (
            <div className=" h-full flex flex-col justify-center">
              <p className="text-xs font-light text-white">{`Earn 10% on each order placed`}</p>
              <p className="sm:text-lg text-base  text-white font-semibold ">{`Join The Referral Program`}</p>
            </div>
          ) : (
            <div className=" h-full flex flex-col justify-center">
              <p className="text-xs font-light text-white">{`Orders placed through this link will earn you 10%`}</p>
              <p className="text-lg text-white font-semibold">{`Share The Link & Earn Money`}</p>
            </div>
          )}

          {status === "not-registered" && (
            <button
              onClick={() => setModalShow(true)}
              className="h-12 rounded-md sm:px-9 px-2 sm:text-base text-sm whitespace-nowrap bg-[#E23DCB] text-white font-semibold"
            >{`Apply Now`}</button>
          )}
          {status === "registered" && (
            <Link href={"https://duber.getrewardful.com/login"}>
              <a target="_blank">
                <button className="sm:flex items-center hidden h-12 rounded-md sm:px-9 px-2 sm:text-base text-sm bg-[#E23DCB] text-white font-semibold">{`View Payouts`}</button>
              </a>
            </Link>
          )}
          {status === "pending" && (
            <button
              disabled
              className="cursor-default h-12 rounded-md sm:px-7 px-2 sm:text-base text-xs whitespace-nowrap bg-[#CBCBCB] text-black font-semibold"
            >{`Awaiting Approval`}</button>
          )}
        </div>

        {status === "registered" && (
          <div className="mt-3">
            <div className="bg-primaryBlueLight w-full rounded-md p-3 flex items-center justify-between">
              <p className="text-primaryBlue text-sm">{referralLink}</p>

              <div className="cursor-pointer">
                <ShareIcon
                  className="w-5 h-5 text-primaryBlue"
                  strokeWidth={2}
                />
              </div>
            </div>

            <div className="mt-4 sm:hidden flex items-center justify-between gap-x-2">
              <p className="text-white text-[.6rem]">{`*joining the referral program is you accepting the terms and conditions.`}</p>

              <Link href={"https://duber.getrewardful.com/login"}>
                <a target="_blank" rel="noopener noreferrer">
                  <button className="h-12 rounded-md whitespace-nowrap px-5 text-sm bg-[#E23DCB] text-white font-semibold">{`View `}</button>
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>

      <p
        className={`${
          status === "registered" && "sm:flex hidden"
        } mt-3 text-xs text-navyBlue`}
      >{`*joining the referral program is you accepting the terms and conditions.`}</p>
    </div>
  );
};

export default AffiliateCard;
