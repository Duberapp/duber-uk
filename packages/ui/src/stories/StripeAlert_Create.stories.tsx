import CreateStripeAlert from '../components/custom/StripeComponents/CreateStripeAlert'
import { CreateButton } from '../components/custom/StripeComponents/StripeButton'
import { Meta, StoryFn } from "@storybook/react";


const meta: Meta<typeof CreateStripeAlert> = {
  title: "Stripe Alert - Create Account",
  component: CreateStripeAlert,
  argTypes: {},
  args: {}
}

export default meta;

const Template: StoryFn<typeof CreateStripeAlert> = (args: any) => <CreateStripeAlert {...args} />

export const Default: StoryFn<typeof CreateStripeAlert> = Template.bind({})
Default.args = {
  StripeButton: <CreateButton
    onClick={() => console.log("Create Stripe Account")}
    logo_url='/stripe-1.png'
  />
}