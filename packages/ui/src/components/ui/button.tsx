import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Duber Variants
        default:
          "bg-duber-navyBlue text-primary-foreground shadow hover:bg-duber-navyBlue-dark",

        skyBlue:
          "bg-duber-skyBlue text-primary-foreground shadow hover:bg-duber-skyBlue-dark",

        "skyBlue-light":
          "bg-duber-skyBlue-light text-duber-skyBlue shadow",

        teal:
          "bg-duber-teal text-white shadow hover:bg-duber-teal-dark",

        "teal-dark":
          "bg-duber-teal-dark text-white shadow hover:bg-duber-teal-dark",

        "teal-light":
          "bg-duber-teal-light text-duber-teal shadow",

        pink: "bg-duber-pink text-white shadow hover:bg-duber-pink-dark",
        "pink-outline": "border-2 border-duber-pink text-duber-pink shadow",

        // Defaults by Shadcn UI
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        white: "text-duber-navyBlue-dark bg-white shadow hover:bg-gray-100"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 disabled:opacity-1",
        xxl: "w-32 h-12 rounded-md text-lg uppercase font-bold"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
