import React from "react"
import Form from "app/components/Form"
import { Button } from "theme-ui"
import LabeledTextField from "app/components/LabeledTextField"

type PurposeFormProps = {
  initialValues: any
  onSubmit: (values: any) => Promise<any>
}

const PurposeForm = ({ initialValues, onSubmit }: PurposeFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="الغرض" />

      <Button sx={{ marginY: 2, marginRight: "auto", display: "block", width: 150 }}>تاكيد</Button>
    </Form>
  )
}

export default PurposeForm
