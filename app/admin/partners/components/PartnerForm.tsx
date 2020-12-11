import { PartnerCreateInput } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button, Card } from "theme-ui"
import * as z from "zod"

type PartnerFormProps = {
  initialValues: any
  onSubmit: (data: PartnerCreateInput) => Promise<any>
}

const Schema = z.object({
  name: z.string(),
  image: z.string(),
})

const PartnerForm = ({ initialValues, onSubmit }: PartnerFormProps) => {
  return (
    <Card sx={{ boxShadow: "card", borderRadius: "xl", backgroundColor: "background", padding: 4 }}>
      <Form schema={Schema} initialValues={initialValues} onSubmit={onSubmit}>
        <LabeledTextField name="name" label="الشريك" />
        <MediaWidthTextField name="image" label="الصورة" />

        <Button>تاكيد</Button>
      </Form>
    </Card>
  )
}

export default PartnerForm
