import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFileStatus } from "../../redux/uploadLogSlice";

const UploadedFileBadges = ({ uploadedFiles, uploadLog, handleReupload }) => {
  return (
    <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
      {uploadedFiles.length > 0 &&
        uploadedFiles.map((file, index) => (
          <ProgressBadge
            file={file}
            key={index}
            handleReupload={handleReupload}
          />
        ))}
    </div>
  );
};

export default UploadedFileBadges;

const ProgressBadge = ({ file, handleReupload }) => {
  const [isHintShow, setIsHintShow] = useState(false);
  const dispatch = useDispatch();
  const uploadLogRedux = useSelector((state) => state.uploadLog.logList);
  const isFinished = useSelector((state) => state.uploadLog.isFinished);

  let badgeData = uploadLogRedux.filter((log) => log.fileName === file.name);

  let badgeStatus = badgeData.length > 0 && badgeData[0]["status"];
  let badgeSignedUrl = badgeData.length > 0 && badgeData[0]["signedUrl"];
  let badgeProgress = badgeData.length > 0 && badgeData[0]["progress"];

  let isInvalid = badgeStatus === "invalid";

  useEffect(() => {
    if (!badgeSignedUrl) {
      dispatch(
        updateFileStatus({
          fileName: file.name,
          status: "invalid",
        })
      );
    }

    if (badgeStatus !== "reuploading" && isFinished && badgeProgress < 100) {
      dispatch(
        updateFileStatus({
          fileName: file.name,
          status: "invalid",
        })
      );
    }

    if (badgeData.length > 0 && badgeData[0]["status"] === "invalid") {
      dispatch(
        updateFileStatus({
          fileName: file.name,
          status: "invalid",
        })
      );
    }
  }, [badgeSignedUrl, isFinished, badgeProgress]);

  const showHint = (mouseEvent) => {
    // return if not invalid
    if (!isInvalid) return;

    if (mouseEvent === "enter") {
      setIsHintShow(true);
    } else if (mouseEvent === "leave") {
      setIsHintShow(false);
    }
  };

  const handleClickBadge = () => {
    // return if not invalid
    if (!isInvalid) return;

    setIsHintShow(false);
    // handle re-upload
    try {
      dispatch(
        updateFileStatus({
          fileName: file.name,
          status: "reuploading",
        })
      );

      handleReupload(file);
    } catch (err) {}
  };

  return (
    <div
      onClick={handleClickBadge}
      onMouseEnter={() => showHint("enter")}
      onMouseLeave={() => showHint("leave")}
      className={`${
        isInvalid
          ? "bg-red-500 cursor-pointer hover:bg-red-600"
          : badgeProgress > 99
          ? "bg-teal-500"
          : "bg-gray-200"
      }  h-6 relative rounded-full flex items-center`}
    >
      {/* Hint lable */}
      {isHintShow && (
        <div className="absolute z-50 top-8 -left-6 p-3 bg-[#000000c4] rounded-lg whitespace-nowrap">
          <p className="text-white text-xs font-semibold">{`Click to Re-Upload File`}</p>
        </div>
      )}

      {badgeProgress < 100 && (
        <div
          style={{ width: `${badgeProgress}%` }}
          className={`h-full absolute rounded-full bg-green-300 ${
            badgeProgress > 4 && "border border-green-400"
          } transition-all duration-300 ease-linear `}
        />
      )}

      <p
        style={{ position: "inherit" }}
        className={`text-xs ${
          badgeProgress > 99
            ? "text-white"
            : badgeProgress > 50
            ? "text-green-700"
            : "text-gray-600"
        } w-full h-full px-3 flex items-center justify-center`}
      >
        {isInvalid && (
          <XCircleIcon
            className="-ml-2 mr-1"
            color="white"
            width={20}
            height={20}
          />
        )}
        {!isInvalid && badgeProgress > 99 && (
          <CheckCircleIcon
            className="-ml-2 mr-1"
            color="white"
            width={20}
            height={20}
          />
        )}
        {file.name}{" "}
        {badgeProgress > 0 && badgeProgress < 100 && ` - ${badgeProgress}%`}
      </p>
    </div>
  );
};
