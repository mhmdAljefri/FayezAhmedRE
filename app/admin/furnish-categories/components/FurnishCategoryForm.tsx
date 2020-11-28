import { FurnishCategoryCreateInput } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button } from "theme-ui"

type FurnishCategoryFormProps = {
  initialValues: any
  onSubmit: (data: FurnishCategoryCreateInput) => Promise<any>
}

// model FurnishCategory {
//   id          Int      @default(autoincrement()) @id
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt

//   name        String @unique
//   image       String
//   furnish     Furnish[]
// }

const FurnishCategoryForm = ({ initialValues, onSubmit }: FurnishCategoryFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="الاسم" />
      <MediaWidthTextField name="image" label="الصورة" />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default FurnishCategoryForm
