import React from "react"
import { Field } from "react-final-form"
import { Label, Select } from "theme-ui"

type LabeledMenuFieldType = {
  name: string
  label: string
  options: any[]

  getLabel?: (option: any) => string
  getValue?: (option: any) => string | number
}

export default function LabeledMenuField({
  getValue,
  getLabel,
  name,
  label,
  options,
}: LabeledMenuFieldType) {
  const dropDownOption = options.map((option: any) => {
    const value = getValue ? getValue(option) : option
    const name = getLabel ? getLabel(option) : option
    return (
      <option key={value} value={value}>
        {name}
      </option>
    )
  })
  return (
    <div>
      <Label>{label}</Label>
      <Field render={({ input }) => <Select {...input}>{dropDownOption}</Select>} name={name} />
    </div>
  )
}
