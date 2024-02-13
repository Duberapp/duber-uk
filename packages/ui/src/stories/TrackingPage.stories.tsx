import { Meta, StoryFn } from "@storybook/react";
import ShowcaseComponent from '../components/custom/TrackingPageComponents/ShowcaseComponent'

const meta: Meta<typeof ShowcaseComponent> = {
  title: "Tracking Page",
  component: ShowcaseComponent,
  argTypes: {},
  args: {}
}

export default meta;

const Template: StoryFn<typeof ShowcaseComponent> = (args: any) => (
  <div className='w-full h-screen flex items-center justify-center'>
    <ShowcaseComponent {...args} />
  </div>
)

export const Default: StoryFn<typeof ShowcaseComponent> = Template.bind({})
Default.args = {
  trackingStatus: "Live",
  expireCountDown: 12,
  isBookingCancelled: false,
  isPilotAssigned: false,
  isSubscriptionEnabled: false,
  orderData: {
    address: "59 Washbrook Road, Portsmouth, United Kingdom, PO6 3SA",
    arrivalTime: "8 am",
    date: "15 November 2023",
    delivery_method: "Videos & Photos",
    duration: 2,
    expertise: "Marketing",
    bookingDescription:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
  }
}