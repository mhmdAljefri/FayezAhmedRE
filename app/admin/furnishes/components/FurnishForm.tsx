import { FurnishCreateInput } from "@prisma/client"
import LabeledMenuField from "app/admin/components/LabeledMenuField"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import getFurnishCategories from "app/admin/furnish-categories/queries/getFurnishCategories"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import { usePaginatedQuery } from "blitz"
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

const CategoryField = () => {
  const [{ furnishCategories }] = usePaginatedQuery(getFurnishCategories, {})

  return <LabeledMenuField label="الصمف" name="categoryId" options={furnishCategories} />
}

const FurnishForm = ({ initialValues, onSubmit }: FurnishFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="الاسم" />
      <LabeledTextField name="description" label="التفاصيل" />
      <LabeledTextField name="price" label="السعر" type="number" />
      <MediaWidthTextField name="image" label="الصوره" />
      <CategoryField />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default FurnishForm
