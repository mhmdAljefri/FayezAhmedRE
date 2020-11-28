import { FeatureCreateInput } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button } from "theme-ui"

type FeatureFormProps = {
  initialValues: any
  onSubmit: (values: FeatureCreateInput) => Promise<any>
}

const FeatureForm = ({ initialValues, onSubmit }: FeatureFormProps) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values)
      }}
    >
      <LabeledTextField name="name" label="عنوان الميزة" />
      <MediaWidthTextField name="image" label="الصورة" />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default FeatureForm
