import Image from "next/image";
import React from "react";

const ListView = () => {
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
      <div className="w-full max-h-[40vh] overflow-auto rounded-xl shadow-box grid grid-cols-1 gap-2 p-2">
        {inspections.map((inspection) => (
          <div key={inspection.id} className="w-full rounded-xl h-fit border">
            <div className="p-2 space-y-2 flex justify-between">
              <div className="flex my-auto space-x-8 text-[10px]">
                <p>{inspection.address}</p>
                <p>{inspection.id}</p>
              </div>
              <div className="flex my-auto space-x-8 text-[10px]">
                <p className="my-auto">{inspection.status}</p>
                <button className="p-1 my-auto bg-primaryTeal font-semibold text-white rounded-md">
                  Start Inspection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ListView;
