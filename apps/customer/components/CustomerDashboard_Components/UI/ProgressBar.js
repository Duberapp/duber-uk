import React from "react";

const ProgressBar = ({
  progressPercentage,
  height,
  textClassName,
  completeText,
}) => {
  return (
    <div className={`h-${height} relative w-full bg-gray-300 rounded-md`}>
      <p
        className={`${textClassName} absolute w-full h-full flex items-center justify-center font-semibold`}
      >
        {!completeText
          ? `Downloading ${progressPercentage.toFixed(2)}%`
          : completeText}
        {/* {progressPercentage < 101 ? `${progressPercentage}%` : completeText} */}
      </p>

      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full bg-primaryTeal rounded-md transition-all duration-300 ease-linear`}
      ></div>
    </div>
  );
};

export default ProgressBar;
