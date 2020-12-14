import { Feature } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button } from "theme-ui"
import * as z from "zod"
type FeatureFormProps = {
  initialValues: any
  onSubmit: (values: Feature) => Promise<any>
}

const Schema = z.object({
  name: z.string(),
  image: z.string(),
})

const FeatureForm = ({ initialValues, onSubmit }: FeatureFormProps) => {
  return (
    <Form initialValues={initialValues} schema={Schema} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="عنوان الخدمة" />
      <MediaWidthTextField name="image" label="الصورة" />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default FeatureForm
