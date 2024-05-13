import React from "react";
import { Input, type InputProps } from "../ui/input";

interface TextFieldProps extends InputProps {
  error: boolean,
  version?: "blue" | null,
  leftIcon?: React.ReactNode,
  parentClassName?: string
}

function TextField({ error, version, leftIcon, parentClassName, ...rest }: TextFieldProps) {

  if (version == 'blue') {
    return (
      <div className={`${parentClassName} ${error && 'outline outline-1 outline-destructive'} h-12 rounded-lg bg-duber-skyBlue-light px-4 py-2 flex items-center gap-x-3`}>
        <div className="">
          {leftIcon}
        </div>

        <input type="text" className={`bg-transparent border-none placeholder:text-duber-skyBlue text-duber-skyBlue-dark outline-none active:border-none active:outline-none`} {...rest} />
      </div>
    )
  }

  return (
    <Input className={`${error && 'outline outline-1 outline-destructive'}`} {...rest} />
  )
}

export default TextField