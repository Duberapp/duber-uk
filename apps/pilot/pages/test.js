import React from "react";
import { Button, TextField, DatePicker } from "ui";

const ComponentGroup = ({ children, title }) => {
  return (
    <div className="w-full max-w-screen-lg border border-gray-400 rounded p-4">
      <h2 className="mb-2">{title}</h2>
      <div className="flex gap-x-3">{children}</div>
    </div>
  );
};

const Test = () => {
  return (
    <div className="h-screen flex flex-col gap-y-3 items-center justify-center">
      <ComponentGroup title={"Button Component"}>
        <Button className="rounded-xl">Press Me</Button>
        <Button variant={"skyBlue"}>Press Me</Button>
        <Button variant={"skyBlue-light"}>Press Me</Button>
        <Button variant={"teal"}>Press Me</Button>
        <Button variant={"teal-light"}>Press Me</Button>
        <Button variant={"pink"}>Press Me</Button>
      </ComponentGroup>

      <ComponentGroup title={"Textfield & Date Picker"}>
        <TextField
          type="email"
          placeholder="vihanga@duber.uk"
          variant={"default"}
        />
        <DatePicker />
      </ComponentGroup>
    </div>
  );
};

export default Test;
