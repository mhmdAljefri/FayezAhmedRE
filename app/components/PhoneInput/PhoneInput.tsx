import { useCallback } from "react"
import ReactPhoneInput from "react-phone-number-input"
import { Select } from "theme-ui"

type PhoneInputProps = {
  placeholder: string
  value?: string
  onChange: (value: string) => void
}

function CountrySelect({ value, onChange, options, ...rest }) {
  const _onChange = useCallback(
    (event) => {
      const value = event.target.value
      onChange(value === "ZZ" ? undefined : value)
    },
    [onChange]
  )

  // "ZZ" means "International".
  // (HTML requires each `<option/>` have some string `value`).
  return (
    <Select {...rest} value={value || "ZZ"} onBlur={_onChange}>
      {options.map(({ value, label, divider }) => (
        <option
          key={divider ? "|" : value || "ZZ"}
          value={divider ? "|" : value || "ZZ"}
          disabled={divider ? true : false}
        >
          {label}
        </option>
      ))}
    </Select>
  )
}

export default function PhoneInput({ placeholder, value, onChange }: PhoneInputProps) {
  return (
    <>
      <ReactPhoneInput
        countrySelectComponent={CountrySelect}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
