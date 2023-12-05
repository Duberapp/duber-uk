import React from "react";
import { PhoneIcon } from "@heroicons/react/24/outline";

const trimSkillName = (name) => {
  switch (name) {
    case "Building / Roof Inspections":
      return "Building";

    case "Photography (Weddings)":
      return "Photography";

    case "Thermal Imaging":
      return "Thermal";

    case "Videography (Films, Docs)":
      return "Videography";

    default:
      return "";
  }
};

const PilotCard = ({ className, pilot }) => {
  const profilePicBaseURL =
    "https://zgkudgezsujgjnqbkbed.supabase.co/storage/v1/object/public/profile-pics";

  const pilotSkillsCount = pilot.userSkills.length;
  const pilotDronesCount = pilot.userDrones.length;

  return (
    <div
      className={`${className} p-2 rounded-md shadow-lg border border-gray-200 flex items-center justify-between`}
    >
      <div className="flex items-center">
        <img
          src={
            pilot.profilePic
              ? `${profilePicBaseURL}/${pilot.profilePic}`
              : "/assets/avatar.jpg"
          }
          className="w-28 h-28 rounded-md"
        />

        {/* Pilot Name */}
        <div className="flex items-center flex-wrap sm:gap-x-0 gap-x-3 sm:ml-0 ml-2">
          <div className="sm:ml-6 ml-0">
            <p className="sm:text-base text-sm font-semibold text-navyBlue">
              Pilot Name
            </p>
            <p className="sm:text-sm text-xs font-normal text-navyBlue">
              {pilot?.firstName} {pilot?.lastName}
            </p>
          </div>

          {/* Pilot Expertise */}
          <div className="sm:ml-8 ml-0">
            <p className="sm:text-base text-sm font-semibold text-navyBlue">
              Expertise
            </p>
            <p className="sm:text-sm text-xs font-normal text-navyBlue">
              {pilot.userSkills.slice(0, 2).map((skill) => (
                <span key={skill.id} className="text-xs">
                  {trimSkillName(skill.text)}, &nbsp;
                </span>
              ))}
              {pilotSkillsCount > 2 && (
                <span className="text-xs">+{pilotSkillsCount - 2}</span>
              )}
            </p>
          </div>

          {/* Pilot Drones */}
          <div className="sm:ml-7 ml-0">
            <p className="sm:text-base text-sm font-semibold text-navyBlue">
              Drones
            </p>
            <p className="sm:text-sm text-xs font-normal text-navyBlue">
              {pilot.userDrones.slice(0, 2).map((drone) => (
                <span key={drone.id} className="text-xs">
                  {drone.brand.name} {drone.model}, &nbsp;
                </span>
              ))}
              {pilotDronesCount > 2 && (
                <span className="text-xs">+{pilotDronesCount - 2}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Contact icon button */}
      <a href={`tel:${pilot.telNumber}`}>
        <button className="mr-3 p-3  flex items-center justify-center outline-none bg-primaryBlueLight text-primaryBlue rounded-xl">
          <PhoneIcon className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </a>
    </div>
  );
};

export default PilotCard;
