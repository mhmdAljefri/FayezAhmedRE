import React from "react"
import { Field } from "react-final-form"
import { Label, Select, SxStyleProp } from "theme-ui"
import Slide from "react-reveal/Slide"

type MenuFieldType = {
  name: string
  sx?: SxStyleProp
  options: any[]
  emptyOptionText?: string

  getLabel?: (option: any) => string
  getValue?: (option: any) => string | number
}

type LabeledMenuFieldType = MenuFieldType & {
  label: string
}
export function MenuField({
  getValue,
  getLabel,
  emptyOptionText,
  sx,
  name,
  options,
}: MenuFieldType) {
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
    <Field
      render={({ input }) => (
        <Select sx={sx} {...input}>
          <option>{emptyOptionText || "اختر عنصر"}</option>
          {dropDownOption}
        </Select>
      )}
      name={name}
    />
  )
}

export default function LabeledMenuField({ label, ...props }: LabeledMenuFieldType) {
  return (
    <Slide bottom>
      <div>
        <Label>{label}</Label>
        <MenuField {...props} />
      </div>
    </Slide>
  )
}
