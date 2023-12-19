import FillDetailsAlert from '../components/custom/StripeComponents/FillDetailsAlert'
import { Meta, StoryFn } from "@storybook/react";


const meta: Meta<typeof FillDetailsAlert> = {
  title: "Stripe Alert - Fill Details",
  component: FillDetailsAlert,
  argTypes: {},
  args: {}
}

export default meta;

const Template: StoryFn<typeof FillDetailsAlert> = (args: any) => <FillDetailsAlert {...args} />

export const Default: StoryFn<typeof FillDetailsAlert> = Template.bind({})
Default.args = {
  link: "#"
}