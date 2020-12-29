import React from "react"
import { Field } from "react-final-form"
import { Box, Label, Select, SxStyleProp } from "theme-ui"
import Slide from "react-reveal/Slide"

type MenuFieldType = {
  name: string
  sx?: SxStyleProp
  options: any[]
  emptyOptionText?: string
  required?: boolean
  getLabel?: (option: any) => string
  getValue?: (option: any) => string | number | number[]
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
  required,
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
      render={({ input, meta }) => (
        <>
          <Select sx={sx} required={required} {...input}>
            <option>{emptyOptionText || "اختر عنصر"}</option>
            {dropDownOption}
          </Select>
          {meta.touched && meta.error && <Box sx={{ color: "red" }}>{meta.error}</Box>}
        </>
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
