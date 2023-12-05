import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const TopCta = () => {
  return (
    <div className="relative shadow-box p-5 rounded-lg space-y-1 flex space-x-8">
      <div className="my-auto">
        <ChatBubbleBottomCenterTextIcon className="h-8 w-8" />
      </div>
      <div className="my-auto">
        <p className="font-semibold text-sm sm:text-base">
          I hope you are enjoying reading this blog
        </p>
        <p className="text-xs sm:text-sm">
          If you want to hire a drone pilot just{" "}
          <Link href="/hire">
            <span className="text-primaryTeal cursor-pointer">click here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TopCta;
