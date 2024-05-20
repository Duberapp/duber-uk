import { Dispatch, SetStateAction } from "react";

type FileType = string | File | null;

export interface MediaTypes {
  image: FileType,
  setImage: Dispatch<SetStateAction<FileType>>,
  video: FileType,
  setVideo: Dispatch<SetStateAction<FileType>>
}