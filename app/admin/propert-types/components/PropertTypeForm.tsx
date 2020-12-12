import { PropertyType } from "@prisma/client"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button } from "theme-ui"
import * as z from "zod"

type PropertyTypeFormProps = {
  initialValues: any
  onSubmit: (values: PropertyType) => Promise<any>
}

const Schema = z.object({
  name: z.string(),
})

const PropertyTypeForm = ({ initialValues, onSubmit }: PropertyTypeFormProps) => {
  return (
    <Form initialValues={initialValues} schema={Schema} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="نوع العقار" />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default PropertyTypeForm
