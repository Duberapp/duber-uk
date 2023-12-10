import DatePicker from "../components/custom/DatePicker";
import { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof DatePicker> = {
  title: "DatePicker",
  component: DatePicker,
  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {}
}

export default meta;

const Template: StoryFn<typeof DatePicker> = (args: any) => <DatePicker {...args} />;

export const Default: StoryFn<typeof DatePicker> = Template.bind({});
Default.args = {
  error: false
};