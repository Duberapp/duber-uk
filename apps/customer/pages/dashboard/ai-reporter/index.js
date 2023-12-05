import React, { useState, useEffect } from "react";
import Head from "next/head";
import { MainLayout } from "../../../components/CustomerDashboard_Components";
import DashboardLayout from "../../../components/CustomerDashboard_Components/DashboardLayout";
import Lottie from "lottie-react";
import AILoadingAnimation from "../../../public/assets/AILoadingAnimation.json";

const Index = () => {
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="relative">
      <Head>
        <title>Duber Drone Pilot Hire</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <MainLayout>
        <DashboardLayout title="AI Reporter">
          <div className="bg-white rounded-xl shadow-box p-5 space-y-5">
            <div className="font-semibold text-base text-navyBlue">
              <h2>Generate a building inspection report about:</h2>
            </div>
            <div className="w-full p-4 bg-slate-100 rounded-lg">
              <textarea
                className="w-full h-[150px] bg-slate-100 outline-none"
                placeholder="Tell the AI what you want the report to be about for example “a single ply pvc membrane flat roof that is leaking due to poorley welded laps which is saturating the PIR insulation and causing damage to the internals of the building.” 
If you notice our example is really specific, this is because AI needs as much information as possible. Otherwise rubbish in = rubbish out."
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="flex flex-row justify-end">
              <button
                className="text-sm py-2 px-5 bg-navyBlue text-white rounded-md hover:bg-primaryTeal"
                type="button"
                onClick={() => setSearch(query)}
              >
                Generate
              </button>
            </div>
            <div>
              <p className="font-semibold text-base text-navyBlue">Result:</p>
            </div>
            {isLoading ? (
              <div className="flex flex-col w-64 mx-auto">
                <p className="-mb-16 text-center">AI Genterating Report..</p>
                <Lottie animationData={AILoadingAnimation} loop={true} />
              </div>
            ) : (
              <span>
                {data.text.split("\n").map((line, index) => {
                  if (
                    line.startsWith("Summary:") ||
                    line.startsWith("Recommendations:") ||
                    line.startsWith("Conclusion:")
                  ) {
                    return (
                      <div key={index}>
                        <br />
                        <strong>{line}</strong>
                      </div>
                    );
                  }
                  return line;
                })}
              </span>
            )}
          </div>
        </DashboardLayout>
      </MainLayout>
    </div>
  );
};

export default Index;
