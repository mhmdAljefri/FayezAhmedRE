import React from "react"
import { Field } from "react-final-form"
import { Box, Flex, Image, Label } from "theme-ui"
import UploadCloudinary from "./UploadCloudinary"
import Slide from "react-reveal/Slide"
import { FieldArray } from "react-final-form-arrays"
import { Icon } from "react-icons-kit"
import { close } from "react-icons-kit/fa/close"

type MediaWidthTextFieldType = {
  name: string
  label: string
  multiple?: boolean
  accept?: "image/*" | "video/*" | ".pdf"
}

export default function MediaWidthTextField({
  multiple,
  name,
  label,
  accept,
}: MediaWidthTextFieldType) {
  return (
    <Slide bottom>
      <div>
        <Label>{label}</Label>
        {!multiple ? (
          <Field
            render={({ input }) => (
              <UploadCloudinary
                {...input}
                accept={accept}
                onChange={(data) => input.onChange(data)}
              />
            )}
            name={name}
          />
        ) : (
          <FieldArray
            name={name}
            render={({ fields }) => (
              <>
                <UploadCloudinary
                  multiple={multiple}
                  accept={accept}
                  onChange={(data: string[]) => {
                    data.map((url) => fields.push(url))
                  }}
                />
                <Flex>
                  {fields.value?.map((url, index) => (
                    <Box sx={{ position: "relative" }}>
                      <Icon
                        icon={close}
                        style={{ position: "absolute", top: 5, left: 5, color: "red" }}
                        onClick={() => fields.remove(index)}
                      />
                      <Image sx={{ width: 80 }} key={index} src={url} alt="..." />
                    </Box>
                  ))}
                </Flex>
              </>
            )}
          />
        )}
      </div>
    </Slide>
  )
}
