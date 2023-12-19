import { StripeButton } from '../components/custom/StripeComponents/StripeButton'
import { Meta, StoryFn } from "@storybook/react";


const meta: Meta<typeof StripeButton> = {
  title: "Stripe Button",
  component: StripeButton,
  argTypes: {},
  args: {}
}

export default meta;

const Template: StoryFn<typeof StripeButton> = (args: any) => (
  <div className='w-56'>
    <StripeButton {...args} />
  </div>
)

export const Default: StoryFn<typeof StripeButton> = Template.bind({})
Default.args = {
  state: "disabled",
  disabled: true,
  logo_url: "/stripe-1.png",
  loading: false,
}

export const Create: StoryFn<typeof StripeButton> = Template.bind({})
Create.args = {
  state: "create",
  disabled: false,
  logo_url: "/stripe-1.png",
}

export const Manage: StoryFn<typeof StripeButton> = Template.bind({})
Manage.args = {
  state: "manage",
  disabled: false,
  logo_url: "/stripe-1.png",
}
