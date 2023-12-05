import React, { useEffect } from "react";
import formatBytes from "../../utils/formatBytes";
import { useSelector } from "react-redux";

const ProgressBar = ({
  height,
  totalUploadSize,
  currentUploadedSize,
  isHoldFinish,
  setHoldFinish,
  handleCompleteJob,
  isCompleting,
}) => {
  const precentage = Math.floor((currentUploadedSize * 100) / totalUploadSize);
  const logList = useSelector((state) => state.uploadLog.logList);

  const invalidCount = logList.filter(
    (item) => item.status === "invalid"
  ).length;

  useEffect(() => {
    if (currentUploadedSize < totalUploadSize) {
      if (invalidCount > 0) setHoldFinish(true);
    } else {
      setHoldFinish(false);

      // This validates uploaded bytes exact same to sum of all bytes
      // if not all files were uploaded, job wont be finished.
      if (precentage === 100) {
        handleCompleteJob();
      }
    }
  }, [currentUploadedSize]);

  return (
    <div className={`h-${height} relative w-full bg-gray-300 rounded-md`}>
      <p className="absolute w-full h-full flex items-center justify-center font-semibold">
        {!isCompleting ? (
          <span>
            {`Uploading ${precentage}%`}{" "}
            <span className="text-xs">
              {`(${formatBytes(currentUploadedSize)} / ${formatBytes(
                totalUploadSize
              )})`}
            </span>
          </span>
        ) : (
          "Completing Job..."
        )}
      </p>
      <div
        style={{ width: `${precentage}%` }}
        className={`h-full ${invalidCount < 1 && "bg-primaryTeal"} ${
          isHoldFinish ? "bg-yellow-500" : "bg-primaryTeal"
        }  rounded-md transition-all duration-300 ease-linear`}
      ></div>
    </div>
  );
};

export default ProgressBar;
