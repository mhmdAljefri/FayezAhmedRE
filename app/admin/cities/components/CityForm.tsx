import { City, Prisma } from "@prisma/client"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button } from "theme-ui"

type CityFormProps = {
  initialValues: any
  onSubmit: (values: Omit<Prisma.CityCreateArgs["data"], "country">) => Promise<any>
}

const CityForm = ({ initialValues, onSubmit }: CityFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField label="اسم المدينة" name="name" />
      <Button>ارسال</Button>
    </Form>
  )
}

export default CityForm
