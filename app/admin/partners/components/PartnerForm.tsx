import { PartnerCreateInput } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button, Card } from "theme-ui"

type PartnerFormProps = {
  initialValues: any
  onSubmit: (data: PartnerCreateInput) => Promise<any>
}

const PartnerForm = ({ initialValues, onSubmit }: PartnerFormProps) => {
  return (
    <Card sx={{ boxShadow: "card", borderRadius: "xl", backgroundColor: "background", padding: 4 }}>
      <Form
        initialValues={initialValues}
        onSubmit={(event) => {
          onSubmit(event)
        }}
      >
        <LabeledTextField name="name" label="الشريك" />
        <MediaWidthTextField name="image" label="فيديو حالة المشروع" />

        <Button>تاكيد</Button>
      </Form>
    </Card>
  )
}

export default PartnerForm
