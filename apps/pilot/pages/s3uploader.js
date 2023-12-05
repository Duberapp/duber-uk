import React, { useState, useEffect } from "react";
import { s3 } from "../config/aws";

const S3Uploader = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fileProgress, setFileProgress] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);

  // Caculate total progress
  useEffect(() => {
    const calculateTotalProgress = () => {
      const arrSizes = [];
      Object.entries(fileProgress).map((progress) =>
        arrSizes.push(parseFloat(progress[1]))
      );

      if (arrSizes.length === 0) return;
      const arrTotal = arrSizes.reduce((total, num) => total + num);
      const progress = (arrTotal / files.length).toFixed(2);
      setTotalProgress(progress);
    };

    calculateTotalProgress();
  }, [fileProgress]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    try {
      setLoading(true);

      files.map(async (file) => {
        const res = await uploadHandler(
          "react-upload",
          file.name,
          file,
          setFileProgress,
          fileProgress
        );
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-y-3 max-w-sm">
      {loading && <p>{`Uploading...`}</p>}
      <div className="mb-2">
        {Object.keys(fileProgress).length !== 0 &&
          Object.entries(fileProgress).map((file, index) => (
            <div className="bg-gray-300 h-8 mb-2 relative" key={index}>
              <p className="absolute text-sm w-full h-full flex items-center justify-center">
                {file[0]} : {file[1]}%
              </p>
              <div
                style={{ width: `${file[1]}%` }}
                className={`h-full bg-primaryTeal transition-all duration-300 ease-linear`}
              />
            </div>
          ))}
      </div>

      <input
        type="file"
        multiple
        onChange={(e) => {
          const fileList = Object.entries(e.target.files);
          fileList.map((file) => {
            setFiles((prevState) => [...prevState, file[1]]);
            setFileProgress((prevState) => ({
              ...prevState,
              [file[1].name]: 0,
            }));
          });
        }}
      />

      {files.length !== 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}

      <button className="bg-gray-400 h-8 relative" onClick={handleUpload}>
        <p className="absolute text-sm w-full h-full flex items-center justify-center">
          Upload {totalProgress}%
        </p>

        <div
          style={{ width: `${totalProgress}%` }}
          className={`h-8 bg-primaryTeal transition-all duration-300 ease-linear`}
        />
      </button>
    </div>
  );
};

export default S3Uploader;

const uploadHandler = async (
  folderName,
  fileName,
  fileBody,
  setFileProgress,
  fileProgress
) => {
  const res = await s3
    .upload({
      Bucket: "duber-order-assets",
      Key: `${folderName}/${fileName}`,
      Body: fileBody,
      ACL: "public-read",
    })
    .on("httpUploadProgress", (event) => {
      // console.log(event);
      const currentObj_Key = event.key.split("/")[1];
      const currentObj_Value = ((event.loaded / event.total) * 100).toFixed(2);

      setFileProgress((prevState) => {
        return {
          ...prevState,
          [currentObj_Key]: currentObj_Value,
        };
      });

      // if (event.key === "react-upload/TestImage1.jpg")
      //   setFirstFileSize(((event.loaded / event.total) * 100).toFixed(2));
    })
    .promise();

  return res;
};
