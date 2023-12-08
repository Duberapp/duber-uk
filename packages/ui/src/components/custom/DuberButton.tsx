import { Loader2 } from 'lucide-react'
import { Button, type ButtonProps } from '../ui/button'

interface DuberButtonProps extends ButtonProps {
  isLoading: boolean,
  loadingText?: string,
  isIcon?: boolean,
  withIcon?: boolean,
  icon?: React.ReactNode | null
}

export default function DuberButton({
  isLoading,
  loadingText,
  children,
  variant = 'default',
  size = "default",
  isIcon = false,
  withIcon = false,
  icon = null,
  ...rest
}: DuberButtonProps) {

  if (isIcon) {
    return (
      <Button size={"icon"} variant={variant} {...rest}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      </Button>
    )
  } else if (withIcon) {
    return (
      <Button size={size} variant={variant} {...rest}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : icon} {children}
      </Button>
    )
  } else if (isLoading) {
    return (
      <Button disabled variant={variant} size={size}  {...rest}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {loadingText || children}
      </Button>
    )
  } else {
    return (
      <Button variant={variant} size={size}  {...rest}>
        {children}
      </Button>
    )
  }

}