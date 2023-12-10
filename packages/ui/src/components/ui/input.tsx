import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0  file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        transparent: "bg-transparent file:bg-transparent placeholder:text-muted-foreground focus-visible:ring-ring",
        default: "bg-duber-skyBlue-light file:bg-duber-skyBlue-light placeholder:text-duber-skyBlue-low text-duber-skyBlue focus-visible:ring-duber-skyBlue"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
