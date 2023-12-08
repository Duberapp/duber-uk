import * as React from "react"
import { Alert, AlertDescription, AlertTitle, alertVariants } from "../components/ui/alert";
import { Meta, StoryFn } from "@storybook/react";
import { type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const AlertComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <Alert className={cn(alertVariants({ variant }), className)} {...props} ref={ref}>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components and dependencies to your app using the cli.
    </AlertDescription>
  </Alert>
))

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: AlertComponent,
  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export default meta;

const Template: StoryFn<typeof AlertComponent> = (args: any) => <AlertComponent {...args} />;

export const Default: StoryFn<typeof AlertComponent> = Template.bind({});
Default.args = {

};

export const Destructive: StoryFn<typeof AlertComponent> = Template.bind({});
Destructive.args = {
  variant: "destructive"
};

