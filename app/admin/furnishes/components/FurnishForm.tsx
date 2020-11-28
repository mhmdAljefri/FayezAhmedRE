import { FurnishCreateInput } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button } from "theme-ui"

type FurnishFormProps = {
  initialValues: any
  onSubmit: (data: FurnishCreateInput) => Promise<any>
}

// model Furnish {
//   id                Int      @default(autoincrement()) @id
//   createdAt         DateTime @default(now())
//   updatedAt         DateTime @updatedAt

//   name              String
//   description       String
//   image             String
//   price             String

//   furnishCategory   FurnishCategory  @relation(fields: [furnishCategoryId], references: [id])
//   furnishCategoryId Int
// }

const FurnishForm = ({ initialValues, onSubmit }: FurnishFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="الاسم" />
      <LabeledTextField name="description" label="التفاصيل" />
      <LabeledTextField name="price" label="السعر" type="number" />
      <MediaWidthTextField name="image" label="الصوره" />

      <Button>تاكيد</Button>
    </Form>
  )
}

export default FurnishForm
