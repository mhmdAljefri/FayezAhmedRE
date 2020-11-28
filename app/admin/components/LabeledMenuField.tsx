import React from "react"
import { Field } from "react-final-form"
import { Label, Select } from "theme-ui"

type MenuFieldType = {
  name: string
  options: any[]

  getLabel?: (option: any) => string
  getValue?: (option: any) => string | number
}

type LabeledMenuFieldType = MenuFieldType & {
  label: string
}
export function MenuField({ getValue, getLabel, name, options }: MenuFieldType) {
  const dropDownOption = options.map((option: any) => {
    const value = getValue ? getValue(option) : option
    const name = getLabel ? getLabel(option) : option
    return (
      <option key={value} value={value}>
        {name}
      </option>
    )
  })
  return <Field render={({ input }) => <Select {...input}>{dropDownOption}</Select>} name={name} />
}

export default function LabeledMenuField({ label, ...props }: LabeledMenuFieldType) {
  return (
    <div>
      <Label>{label}</Label>
      <MenuField {...props} />
    </div>
  )
}
