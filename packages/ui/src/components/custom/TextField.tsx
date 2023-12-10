import { Input, type InputProps } from "../ui/input";

interface TextFieldProps extends InputProps {
  error: boolean
}

function TextField({ error, ...rest }: TextFieldProps) {
  return (
    <Input className={`${error && 'outline outline-1 outline-destructive'}`} {...rest} />
  )
}

export default TextField