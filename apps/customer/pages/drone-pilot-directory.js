import React, { useEffect, useState } from "react";
import Head from "next/head";
import LandingLayout from "../components/LandingPage_Components/LandingLayout";
import { allDronePilots } from "../config/supabaseFunctions";
import DronePilotsMap from "../components/LandingPage_Components/UI/Map/DronePilotsMap";
// import {
//   Autocomplete,
//   Input,
// } from "../components/CustomerDashboard_Components";
import Navbar from "../components/LandingPage_Components/UI/NavBar";
import BottomFooter from "../components/LandingPage_Components/UI/BottomFooter";

export default function DroneDirectory() {
  const [pilotData, setPilotData] = useState([]);
  // const [searchLocation, setSearchLocation] = useState("");

  // Intialize pilot data
  useEffect(() => {
    const initializeData = async () => {
      try {
        const { data, error } = await allDronePilots();
        if (error) throw error;

        setPilotData(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    initializeData();
  }, []);

  return (
    <div className="relative">
      <Head>
        <title>Duber | Drone Pilot Directory</title>
        <meta name="title" content="Duber | Drone Pilot Directory" />
        <meta
          name="description"
          content="Find a local drone pilt with Duber's drone directory"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index,follow" />
      </Head>
      <Navbar />
      <div className="max-w-[1190px] px-4 h-[80vh] mx-auto mb-10">
        <DronePilotsMap
          center={[-10.671529145284985, 54.87069169647994]}
          zoom={4.8}
          pilots={pilotData}
        >
          <div className="absolute z-20 bg-white rounded-lg w-[93%] sm:w-[95%] md:w-96 md:h-[76vh] p-3">
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-2 md:space-y-4">
                {/*Title*/}
                <div className="text-navyBlue w-full">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    Find a local drone pilot
                  </h1>
                  <p className="text-base sm:text-md md:text-lg text-gray-400">
                    UK’s trusted drone pilot directory
                  </p>
                </div>
                {/* Search Input */}
                <div className="mb-2">
                  {/* <Input>
                    <Autocomplete
                      searchCapture={searchLocation}
                      setSearchCapture={setSearchLocation}
                    />
                  </Input> */}
                </div>

                {/* Pilot List */}
                <div className="h-1 md:h-full md:max-h-[48vh] collapse md:visible space-y-3 py-2 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
                  {pilotData.map(({ pilot, jobs, billing }) => (
                    <div
                      key={pilot.id}
                      className={
                        "p-2 flex space-x-1 mr-5 ml-2 rounded-lg shadow-sharp"
                      }
                    >
                      <div className="w-20 h-20">
                        {/* Profile pic */}
                        {!pilot.profilePic ? ( // If pilot doest not contain a profile pic, value is Null
                          <img
                            className="w-20 h-20 rounded"
                            src="https://pilotdev.duber.uk/assets/avatar.jpg"
                            alt="ProfilePic"
                          />
                        ) : (
                          <img
                            className="w-20 h-20 rounded"
                            src={`https://zgkudgezsujgjnqbkbed.supabase.co/storage/v1/object/public/profile-pics/${pilot.profilePic}`}
                            alt="ProfilePic"
                          />
                        )}
                      </div>

                      <div className="w-[250px]">
                        {/* Badges */}
                        <div className="flex space-x-1 justify-end">
                          <p className="">
                            <span
                              className={` ${
                                pilot.confirmNoProof
                                  ? "bg-white p-1"
                                  : "p-1 text-white text-[10px] rounded bg-amber-500"
                              }`}
                            >
                              {/* Span will appear if not confirmNoProof */}
                              {!pilot.confirmNoProof ? "A2 CofC / GVC" : ""}
                            </span>
                          </p>
                          <p className="">
                            <span className="p-1 text-white text-[10px] rounded bg-primaryBlue">
                              CAA Registered
                            </span>
                          </p>
                        </div>

                        {/* Name and ID */}
                        <p className="text-navyBlue font-semibold text-sm">
                          {pilot.firstName} {pilot.lastName}
                        </p>
                        <div className="space-y-1 text-[8px]">
                          {/* Drones */}
                          <p className="space-x-1">
                            {pilot.userDrones.map((drone) => (
                              <span
                                key={drone.id}
                                className="bg-gray-200 p-1 rounded-sm"
                              >{`${drone.brand.name}, ${drone.model}`}</span>
                            ))}
                          </p>

                          {/* Skills */}
                          <p className="space-x-1">
                            {pilot.userSkills.map((skill) => (
                              <span
                                key={skill.id}
                                className="bg-gray-200 mb-1 p-1"
                              >{`${skill.text}`}</span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Book Now Button */}
              <div className="w-full bg-primaryTeal p-2 rounded-md">
                <p className="w-full text-center font-semibold text-white text-lg">
                  Book Now
                </p>
              </div>
            </div>
          </div>
        </DronePilotsMap>
      </div>
      <div className="px-4 pb-10 md:pb-0">
        <div className="h-full md:h-0 max-h-[48vh] md:collapse visible space-y-3 py-2 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
          {pilotData.map(({ pilot, jobs, billing }) => (
            <div
              key={pilot.id}
              className={"p-2 flex space-x-1 mr-5 ml-2 rounded-lg shadow-sharp"}
            >
              <div className="w-20 h-20">
                {/* Profile pic */}
                {!pilot.profilePic ? ( // If pilot doest not contain a profile pic, value is Null
                  <img
                    className="w-20 h-20 rounded"
                    src="https://pilotdev.duber.uk/assets/avatar.jpg"
                    alt="ProfilePic"
                  />
                ) : (
                  <img
                    className="w-20 h-20 rounded"
                    src={`https://zgkudgezsujgjnqbkbed.supabase.co/storage/v1/object/public/profile-pics/${pilot.profilePic}`}
                    alt="ProfilePic"
                  />
                )}
              </div>

              <div className="w-[250px]">
                {/* Badges */}
                <div className="flex space-x-1 justify-end">
                  <p className="">
                    <span
                      className={` ${
                        pilot.confirmNoProof
                          ? "bg-white p-1"
                          : "p-1 text-white text-[10px] rounded bg-amber-500"
                      }`}
                    >
                      {/* Span will appear if not confirmNoProof */}
                      {!pilot.confirmNoProof ? "A2 CofC / GVC" : ""}
                    </span>
                  </p>
                  <p className="">
                    <span className="p-1 text-white text-[10px] rounded bg-primaryBlue">
                      CAA Registered
                    </span>
                  </p>
                </div>

                {/* Name and ID */}
                <p className="text-navyBlue font-semibold text-sm">
                  {pilot.firstName} {pilot.lastName}
                </p>
                <div className="space-y-1 text-[8px]">
                  {/* Drones */}
                  <p className="space-x-1">
                    {pilot.userDrones.map((drone) => (
                      <span
                        key={drone.id}
                        className="bg-gray-200 p-1 rounded-sm"
                      >{`${drone.brand.name}, ${drone.model}`}</span>
                    ))}
                  </p>

                  {/* Skills */}
                  <p className="space-x-1">
                    {pilot.userSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-gray-200 mb-1 p-1"
                      >{`${skill.text}`}</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomFooter />
    </div>
  );
}
