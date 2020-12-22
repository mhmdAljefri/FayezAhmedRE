import React from "react"
import Form from "app/components/Form"
import { Button } from "theme-ui"
import { Country } from "@prisma/client"
import LabeledTextField from "app/components/LabeledTextField"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
type CountryFormProps = {
  initialValues: any
  onSubmit: (values: Country) => Promise<any>
}

const CountryForm = ({ initialValues, onSubmit }: CountryFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="تسمية الدولة" />
      <MediaWidthTextField name="image" label="صورة الدولة" />
      <MediaWidthTextField multiple name="carouselImages" label="صور السلايدر المتحرك" />

      <Button sx={{ marginY: 2, marginRight: "auto", display: "block", width: 150 }}>تاكيد</Button>
    </Form>
  )
}

export default CountryForm
