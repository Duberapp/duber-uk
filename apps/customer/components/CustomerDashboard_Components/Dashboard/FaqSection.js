import React from "react";
import Accordion from "../UI/Accordion";

const FaqSection = () => {
  const data = [
    {
      title:
        "Do i need permission from the land owner in order to book a flight",
      content:
        "Yes part of the terms and conditions you will need the land owners permission",
      key: "1",
    },
    {
      title: "What do i recieve once the pilot has carried out the flight?",
      content:
        "In the booking you can select the format of the deliverables, options are photos, videos or both. Once the flight is completed you will recieve a link to download them in a zip folder.",
      key: "2",
    },
    {
      title: "What file type do i recieve for the photos?",
      content:
        "You will recieve the photos and videos in a 4k format or more, the file types will be in RAW to ensure you get the best quality and meta data.",
      key: "3",
    },
    {
      title: "Are the drone flights covered by insurance?",
      content:
        "Yes in order for our drone pilots to carry out your flight they require drone insurance that cover a minimum of £1Million Public Liability.",
      key: "4",
    },
    {
      title: "Are the drone pilots qualified and trained?",
      content:
        "Yes part of the onboarding for the drone pilots they are required to has the sufficent qualifications and training to fly commercialy.",
      key: "5",
    },
    {
      title: "How do i hire a drone pilot?",
      content:
        "Simply click the book now button, enter the address, select a date, draw the area, let us know your requirements and then pay online.",
      key: "6",
    },
  ];

  return (
    <div>
      <p className="mb-4 text-navyBlue font-semibold text-lg">
        {"Frequently asked questions"}
      </p>
      {data.map((item) => (
        <Accordion title={item.title} content={item.content} key={item.key} />
      ))}
    </div>
  );
};

export default FaqSection;
