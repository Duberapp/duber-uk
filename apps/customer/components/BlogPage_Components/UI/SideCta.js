import Link from "next/link";
import React from "react";

const SideCta = () => {
  return (
    <div className="relative bg-navyBlue text-white shadow-box p-5 rounded-lg space-y-1 flex space-x-8">
      <div className="space-y-4">
        <p className="font-semibold text-2xl text-center">
          <span className="font-normal">Do you want a</span> drone pilot?
        </p>
        <p className="text-sm text-center">
          Get instant and secure drone pilot hire with Duber. Trusted and fully
          qualified drone pilots.
        </p>
        <div className="flex flex-row justify-center">
          <button className="py-2 px-6 bg-primaryTeal text-navyBlue font-semibold hover:bg-primaryPink cursor-pointer rounded-md">
            <Link href="/hire">Book Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideCta;
