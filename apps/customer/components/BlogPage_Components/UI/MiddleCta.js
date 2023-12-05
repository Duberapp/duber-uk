
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MiddleCta = () => {
  return (
    <div className="relative shadow-box rounded-lg flex max-h-[340px]">
      <div className="hidden min-w-[145px] bg-navyBlue rounded-tl-lg rounded-bl-lg md:flex flex-col justify-end">
        <Image
          className="rounded-tl-lg rounded-bl-lg"
          src="/assets/Drone-Pilot-Hire.jpg"
          alt="Drone Pilot"
          width={260}
          height={340}
        />
      </div>
      <div className="p-5 w-full md:max-w-[440px] space-y-5 flex flex-col justify-between">
        <div className="space-y-5">
          <p className="font-semibold text-lg sm:text-xl">
            Get a new persepctive with drone footage
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Property Listings:</span> Level up
              your property photography.
            </p>
            <p className="text-sm">
              <span className="font-semibold">Building Inspections:</span> Drone
              give you better insight when surveying buildings and is safer to.
            </p>
            <p className="text-sm">
              <span className="font-semibold">Social Events:</span> Capture
              stunning footage of you social event, weddings, concerts and
              outdoor shows.
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <button className="py-2 px-6 bg-primaryTeal text-white font-semibold hover:bg-navyBlue cursor-pointer rounded-md">
            <Link href="/hire">Book Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiddleCta;
