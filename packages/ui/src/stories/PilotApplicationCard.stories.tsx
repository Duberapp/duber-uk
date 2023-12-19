import ApplicationCard from '../components/custom/AdminComponents/ApplicationCard'
import { Meta, StoryFn } from "@storybook/react";


const meta: Meta<typeof ApplicationCard> = {
  title: "Pilot Application Card",
  component: ApplicationCard,
  argTypes: {},
  args: {}
}

export default meta;

const Template: StoryFn<typeof ApplicationCard> = (args: any) => (
  <div className='w-2/3'>
    <ApplicationCard {...args} />
  </div>
)

export const New: StoryFn<typeof ApplicationCard> = Template.bind({})
New.args = {
  createdAt: "28/11/2023",
  pilotName: "Jamie Harris",
  isApproved: false,
  isDeclined: false
}
export const Approved: StoryFn<typeof ApplicationCard> = Template.bind({})
Approved.args = {
  createdAt: "28/11/2023",
  pilotName: "Jamie Harris",
  isApproved: true,
  isDeclined: false
}
export const Declined: StoryFn<typeof ApplicationCard> = Template.bind({})
Declined.args = {
  createdAt: "28/11/2023",
  pilotName: "Jamie Harris",
  isApproved: false,
  isDeclined: true
}

