import React from "react"
import { Field } from "react-final-form"
import { Label } from "theme-ui"
import UploadCloudinary from "./UploadCloudinary"

type MediaWidthTextFieldType = {
  name: string
  label: string
  accept?: "image/*" | "video/*" | ".pdf"
}

export default function MediaWidthTextField({ name, label, accept }: MediaWidthTextFieldType) {
  return (
    <div>
      <Label>{label}</Label>
      <Field
        render={({ input }) => (
          <UploadCloudinary
            {...input}
            accept={accept}
            onChange={(data) => input.onChange(data?.url)}
          />
        )}
        name={name}
      />
    </div>
  )
}
