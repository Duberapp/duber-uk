import JobCard from '../components/custom/DashboardComponents/JobCard'
import { Meta, StoryFn } from "@storybook/react";


const meta: Meta<typeof JobCard> = {
  title: "Job Card",
  component: JobCard,
  argTypes: {},
  args: {}
}

export default meta;

const Template: StoryFn<typeof JobCard> = (args: any) => (
  <div className='w-[90%]'>
    <JobCard {...args} />
  </div>
)

export const Default: StoryFn<typeof JobCard> = Template.bind({})
Default.args = {
  expertise: "marketing",
  jobID: 12345,
  jobLocation: "Portsmouth, UK",
  jobDate: "28/11/2023",
}