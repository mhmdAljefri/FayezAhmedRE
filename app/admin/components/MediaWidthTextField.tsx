import React from "react"
import { Field } from "react-final-form"
import { Box, Flex, Label } from "theme-ui"
import UploadCloudinary from "./UploadCloudinary"
import { FieldArray } from "react-final-form-arrays"
import { Icon } from "react-icons-kit"
import { close } from "react-icons-kit/fa/close"
import Image from "app/components/Image"

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
  accept = "image/*",
}: MediaWidthTextFieldType) {
  return (
    <div>
      <Label>{label}</Label>
      {!multiple ? (
        <Field
          render={({ input, meta }) => (
            <>
              <UploadCloudinary
                {...input}
                accept={accept}
                onChange={(data) => input.onChange(data)}
              />
              {input.value && (
                <Box sx={{ position: "relative" }}>
                  <Icon
                    icon={close}
                    style={{ position: "absolute", top: 5, left: 5, color: "red" }}
                    onClick={() => input.onChange(undefined)}
                  />
                  {accept === "video/*" && (
                    <video
                      autoPlay
                      loop
                      muted
                      style={{ height: 80, width: 80, objectFit: "cover" }}
                      controls={false}
                      poster="sky.jpg"
                    >
                      <track kind="captions" />
                      <source
                        src={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.ap-south-1.amazonaws.com/${input.value}`}
                        type="video/mp4"
                      />
                      <source
                        src={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.ap-south-1.amazonaws.com/${input.value}`}
                        type="video/ogg"
                      />
                      <source
                        src={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.ap-south-1.amazonaws.com/${input.value}`}
                        type="video/webm"
                      />
                      <object
                        data={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.ap-south-1.amazonaws.com/${input.value}`}
                      >
                        <embed
                          src={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.ap-south-1.amazonaws.com/${input.value}`}
                        />
                      </object>
                    </video>
                  )}
                  {accept === "image/*" && <Image sx={{ width: 80 }} src={input.value} alt="..." />}
                </Box>
              )}
              {meta.touched && meta.error && <Box sx={{ color: "red" }}>{meta.error}</Box>}
            </>
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
                  <Box key={url + index} sx={{ position: "relative" }}>
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
  )
}
