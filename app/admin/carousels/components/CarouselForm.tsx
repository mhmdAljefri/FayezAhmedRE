import { CarouselCreateInput } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button } from "theme-ui"

type CarouselFormProps = {
  initialValues: any
  onSubmit: (data: CarouselCreateInput) => Promise<any>
}

const CarouselForm = ({ initialValues, onSubmit }: CarouselFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <MediaWidthTextField name="image" label="الخلفية" />
      <LabeledTextField label="الرابط" name="url" />

      <Button>تاكيد</Button>
    </Form>
  )
}

export default CarouselForm
