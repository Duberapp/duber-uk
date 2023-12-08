import DuberButton from "../components/custom/DuberButton";
import { Meta, StoryFn } from "@storybook/react";
import { ChevronRight, Mail } from "lucide-react";

const meta: Meta<typeof DuberButton> = {
  title: "Button",
  component: DuberButton,
  argTypes: {
    size: {
      options: ["sm", "default", "sm", "lg", "xxl"],
      control: { type: "select" }
    },
    isLoading: {
      control: { type: "boolean" }
    },
    loadingText: {
      type: "string",
      description: "This text only shows when button is on Loading state"
    }
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    children: 'Button'
  }
}

export default meta;

const Template: StoryFn<typeof DuberButton> = (args: any) => <DuberButton {...args} />;

export const Default: StoryFn<typeof DuberButton> = Template.bind({});
Default.args = {
};

export const Sky: StoryFn<typeof DuberButton> = Template.bind({});
Sky.args = {
  variant: "skyBlue"
};

export const SkyLight: StoryFn<typeof DuberButton> = Template.bind({});
SkyLight.args = {
  variant: "skyBlue-light"
};

export const Teal: StoryFn<typeof DuberButton> = Template.bind({});
Teal.args = {
  variant: "teal"
};

export const TealLight: StoryFn<typeof DuberButton> = Template.bind({});

TealLight.args = {
  variant: "teal-light"
};

export const Pink: StoryFn<typeof DuberButton> = Template.bind({});
Pink.args = {
  variant: "pink"
};

export const IconButton: StoryFn<typeof DuberButton> = Template.bind({});
IconButton.args = {
  variant: "default",
  isIcon: true,
  icon: <ChevronRight className="h-4 w-4" />
};

export const ButtonWithIcon: StoryFn<typeof DuberButton> = Template.bind({});
ButtonWithIcon.args = {
  variant: "default",
  withIcon: true,
  icon: <Mail className="mr-2 h-4 w-4" />
}