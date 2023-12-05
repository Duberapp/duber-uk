import React, { useState } from "react";
import Image from "next/image";
import { PlayCircleIcon } from "@heroicons/react/24/outline";


const VideoModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  return (
    <div>
      <div className="flex gap-5 ">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="p-8 w-72 h-12 flex items-center justify-start text-color font-semibold text-navyBlue text-md rounded-md mx-auto md:mx-0 hover:text-primaryTeal"
        >
          <PlayCircleIcon className="h-10 w-10" />
          See what we can do
        </button>
      </div>
      {showModal ? (
        <div className="absolute sm:left-36 md:left-52 top-0 mt-10 flex justify-center items-center flex-col w-3/5 h-96 rounded-lg shadow-xl p-2 z-40 bg-white">
          <iframe
            src="https://player.vimeo.com/video/777728273?h=df659bc3b4&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            title="Hire a drone pilot with duber"
            className=" w-full h-full"
          ></iframe>
          <button
            className="my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default VideoModal;
