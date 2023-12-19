import SkillCardPreview from '../components/custom/PilotExpertiseCard/SkillCardPreview'
import { Meta, StoryFn } from "@storybook/react";


const meta: Meta<typeof SkillCardPreview> = {
  title: "Pilot Skills",
  component: SkillCardPreview,
  argTypes: {},
  args: {}
}

export default meta;

const Template: StoryFn<typeof SkillCardPreview> = (args: any) => <SkillCardPreview {...args} />

export const Default: StoryFn<typeof SkillCardPreview> = Template.bind({})
Default.args = {
}