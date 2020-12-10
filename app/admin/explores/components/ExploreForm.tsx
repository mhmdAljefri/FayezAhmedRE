import { Explore } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import ReactReachTextEditor from "app/admin/components/ReactReachTextEditor"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Field } from "react-final-form"
import { Button, Label } from "theme-ui"

type ExploreFormProps = {
  initialValues: any
  onSubmit: (values: Explore) => Promise<any>
}

const ExploreForm = ({ initialValues, onSubmit }: ExploreFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField label="العنوان" name="title" />
      <Label>المحتوى الرئيسي للعرض</Label>
      <Field name="description" render={({ input }) => <ReactReachTextEditor {...input} />} />

      <MediaWidthTextField name="image" label="الصورة" />

      <Button>تاكيد</Button>
    </Form>
  )
}

export default ExploreForm
