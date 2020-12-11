import LabeledMenuField from "app/admin/components/LabeledMenuField"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import ReactReachTextEditor from "app/admin/components/ReactReachTextEditor"
import getFurnishCategories from "app/admin/furnish-categories/queries/getFurnishCategories"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import { usePaginatedQuery } from "blitz"
import React from "react"
import { Field } from "react-final-form"
import { Button, Label } from "theme-ui"
import * as z from "zod"

const Schema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  image: z.string(),
  furnishCategoryId: z.string(),
})

type FurnishFormProps = {
  initialValues: any
  onSubmit: (data: z.infer<typeof Schema>) => Promise<any>
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

  return (
    <LabeledMenuField
      getLabel={(i) => i.name}
      getValue={(i) => i.id}
      label="الصنف"
      name="furnishCategoryId"
      options={[...furnishCategories]}
    />
  )
}

const FurnishForm = ({ initialValues, onSubmit }: FurnishFormProps) => {
  return (
    <Form schema={Schema} initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="الاسم" />
      <Field
        name="description"
        render={({ input }) => (
          <>
            <Label>التفاصيل</Label>
            <ReactReachTextEditor {...input} />
          </>
        )}
      />
      <LabeledTextField name="price" label="السعر" type="number" />
      <MediaWidthTextField name="image" label="الصوره" />
      <CategoryField />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default FurnishForm
