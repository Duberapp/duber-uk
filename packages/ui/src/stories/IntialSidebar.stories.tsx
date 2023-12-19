import { InitialSidebar } from '../components/custom/DashboardComponents/Sidebar'
import { Meta, StoryFn } from "@storybook/react";


const meta: Meta<typeof InitialSidebar> = {
  title: "Dashboard Sidebar - Initial",
  component: InitialSidebar,
  argTypes: {},
  args: {}
}

export default meta;

const Template: StoryFn<typeof InitialSidebar> = (args: any) => (
  <div className='h-screen w-[300px]'>
    <InitialSidebar {...args} />
  </div>
)

export const Default: StoryFn<typeof InitialSidebar> = Template.bind({})
Default.args = {
  img_1: "/assets/sidebar_assets/halo_1.png",
  img_2: "/assets/sidebar_assets/halo_2.png",
  title: "Get started",
  description: "Accept a job and start earning."
}