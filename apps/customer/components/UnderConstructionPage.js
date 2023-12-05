import React from "react";
import { useRouter } from "next/router";

const UnderConstructionPage = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <img src="/assets/Duber Icon and Text.png" className="w-72" alt="" />
      <h2 className="mt-12 text-navyBlue font-semibold text-3xl">
        Website Under Construction
      </h2>

      <button
        onClick={() =>
          router.push(
            {
              pathname: "/duberpilots",
              query: { constructionMode: true },
            },
            "/duberpilots"
          )
        }
        className="bg-primaryTeal text-white px-7 h-12 mt-5 font-semibold rounded-md"
      >
        Join as a drone pilot
      </button>
    </div>
  );
};

export default UnderConstructionPage;
