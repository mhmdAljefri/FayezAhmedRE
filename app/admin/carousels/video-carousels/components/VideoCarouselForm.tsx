import { CarouselVideo } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import React from "react"
import { Field } from "react-final-form"
import { Button, Flex, Label, Radio } from "theme-ui"

type VideoCarouselFormProps = {
  initialValues: any
  onSubmit: (data: Pick<CarouselVideo, "videoUlr" | "isActive">) => Promise<any>
}

const VideoCarouselForm = ({ initialValues, onSubmit }: VideoCarouselFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <MediaWidthTextField accept="video/*" name="videoUlr" label="الفيديو" />

      <Field
        name="isActive"
        initialValue={`${initialValues.isActive || false}`}
        render={({ input }) => (
          <>
            <Label>تفعيل الفيديو</Label>

            <Flex>
              <Label>
                <Radio {...input} checked={input.value === "true"} name="isActive" value="true" />
                نعم
              </Label>
              <Label>
                <Radio {...input} checked={input.value === "false"} name="isActive" value="false" />
                لا
              </Label>
            </Flex>
          </>
        )}
      />
      <Button sx={{ mb: 4 }}>تاكيد</Button>
    </Form>
  )
}

export default VideoCarouselForm
