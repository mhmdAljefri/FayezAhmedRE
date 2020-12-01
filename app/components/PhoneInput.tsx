import ReactPhoneInput from "react-phone-number-input"
import { Input } from "theme-ui"

type PhoneInputProps = {
  placeholder: string
  value?: string
  onChange: (value: string) => void
}

export default function PhoneInput({ placeholder, value, onChange }: PhoneInputProps) {
  return (
    <>
      <ReactPhoneInput
        inputComponent={Input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
