import Image from "next/image";
import React from "react";

const GridView = () => {
    const inspections = [
      {
        image: "/assets/og-image.png",
        address: "59 Washbrook Road",
        id: "#1212323",
        status: "Ready",
      },
      {
        image: "/assets/og-image.png",
        address: "45 Maple Street",
        id: "#4567890",
        status: "In Progress",
      },
      {
        image: "/assets/og-image.png",
        address: "45 Maple Street",
        id: "#457890",
        status: "In Progress",
      },
      {
        image: "/assets/og-image.png",
        address: "45 Maple Street",
        id: "#45670",
        status: "In Progress",
      },
      {
        image: "/assets/og-image.png",
        address: "45 Maple Street",
        id: "#7890",
        status: "In Progress",
      },
      {
        image: "/assets/og-image.png",
        address: "45 Maple Street",
        id: "#4890",
        status: "In Progress",
      },
      {
        image: "/assets/og-image.png",
        address: "45 Maple Street",
        id: "#45670",
        status: "In Progress",
      },
    ];
  return (
      <div className="w-full max-h-[40vh] overflow-auto rounded-xl shadow-box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">

        {inspections.map((inspection) => (
          <div key={inspection.id} className="w-full rounded-xl h-fit border">
            <Image
              className="rounded-xl rounded-b-none"
              alt="inspection thumbnail"
              src={inspection.image}
              height={340}
              width={800}
              objectFit="cover"
              objectPosition="center"
            />
            <div className="px-2 pb-2  space-y-2">
              <div className="flex justify-between text-[10px]">
                <p>{inspection.address}</p>
                <p>{inspection.id}</p>
              </div>
              <div className="flex justify-between text-[10px]">
                <p className="my-auto">{inspection.status}</p>
                <button className="p-1 bg-primaryTeal font-semibold text-white rounded-md">
                  Start Inspection
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
  );
};

export default GridView;
