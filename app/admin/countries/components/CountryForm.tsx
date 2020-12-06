import React from "react"
import Form from "app/components/Form"
import { Button } from "theme-ui"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import { CityCreateInput, CountryUpdateInput } from "@prisma/client"
type CountryFormProps = {
  initialValues: any
  onSubmit: (values: CountryUpdateInput | CityCreateInput) => Promise<any>
}

const CountryForm = ({ initialValues, onSubmit }: CountryFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <MediaWidthTextField multiple name="dontMissitGallery" label="معرض لا تنسى" />
      <MediaWidthTextField multiple name="getInspiredGallery" label="معرض احصل على الالهمام" />
      <MediaWidthTextField multiple name="exploreGallery" label="صور استكشف" />

      <Button sx={{ marginY: 2, marginRight: "auto", display: "block", width: 150 }}>تاكيد</Button>
    </Form>
  )
}

export default CountryForm
