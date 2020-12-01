import { FurnishCategoryCreateInput } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Box, Button } from "theme-ui"

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
    <Box
      sx={{
        backgroundColor: "background",
        boxShadow: "card",
        borderRadius: "default",
        padding: 5,
      }}
    >
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <LabeledTextField name="name" label="الاسم" />
        <MediaWidthTextField name="image" label="الصورة" />
        <Button>تاكيد</Button>
      </Form>
    </Box>
  )
}

export default FurnishCategoryForm
