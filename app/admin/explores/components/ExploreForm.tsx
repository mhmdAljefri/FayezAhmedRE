import { Explore } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import ReactReachTextEditor from "app/admin/components/ReactReachTextEditor"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React, { useState } from "react"
import { Field } from "react-final-form"
import { Button, Flex, Label, Radio } from "theme-ui"
import * as z from "zod"

type ExploreFormProps = {
  initialValues: any
  onSubmit: (values: Explore) => Promise<any>
}

const Schema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
})

const ExploreForm = ({ initialValues, onSubmit }: ExploreFormProps) => {
  const [youtube, setYoutube] = useState(true)

  return (
    <Form schema={Schema} initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField label="العنوان" name="title" />
      <Label>المحتوى الرئيسي للعرض</Label>
      <Field name="description" render={({ input }) => <ReactReachTextEditor {...input} />} />

      <MediaWidthTextField name="image" label="الصورة" />

      <>
        <Flex>
          <Label>
            <Radio
              onClick={() => setYoutube(true)}
              name="dark-mode"
              value="true"
              defaultChecked={youtube}
            />
            فيديو عبر اليوتويب
          </Label>
          <Label>
            <Radio onClick={() => setYoutube(false)} name="dark-mode" value="false" />
            فيديو عبر الموقع
          </Label>
        </Flex>
        {youtube ? (
          <LabeledTextField
            placeholder="https://www.youtube.com/embed/XN5p4EWnOEk"
            name="videoUrl"
            label="نص مشاركة فيديو اليوتيوب"
          />
        ) : (
          <>
            <MediaWidthTextField name="videoUrl" accept="video/*" label="فيديو" />
          </>
        )}
      </>
      <Button>تاكيد</Button>
    </Form>
  )
}

export default ExploreForm
