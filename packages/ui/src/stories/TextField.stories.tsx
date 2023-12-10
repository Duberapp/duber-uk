import TextField from "../components/custom/TextField";
import { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof TextField> = {
  title: "TextField",
  component: TextField,
  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {}
}

export default meta;

const Template: StoryFn<typeof TextField> = (args: any) => <TextField {...args} />;

export const Default: StoryFn<typeof TextField> = Template.bind({});
Default.args = {
  placeholder: "vihanga@duber.uk",
  error: false
};