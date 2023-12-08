import React from "react";
import { Button } from "ui";

const Test = () => {
  return (
    <div className="h-screen flex flex-col gap-y-3 items-center justify-center">
      <Button className="rounded-xl">Press Me</Button>
      <Button variant={"skyBlue"}>Press Me</Button>
      <Button variant={"skyBlue-light"}>Press Me</Button>
      <Button variant={"teal"}>Press Me</Button>
      <Button variant={"teal-light"}>Press Me</Button>
      <Button variant={"pink"}>Press Me</Button>
    </div>
  );
};

export default Test;
