import { CarouselCreateInput } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button } from "theme-ui"

type CarouselFormProps = {
  initialValues: any
  onSubmit: (data: CarouselCreateInput) => Promise<any>
}

// model Carousel {
//   id        Int      @default(autoincrement()) @id
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   position  Int      @unique @default(autoincrement())
//   title     String
//   text      String
//   url       String
//   image     String
// }

const CarouselForm = ({ initialValues, onSubmit }: CarouselFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="title" label="العنوان" />
      <LabeledTextField name="url" label="الرابط" />
      <LabeledTextField name="text" label="التفاصيل" />
      <MediaWidthTextField name="image" label="الخلفية" />

      <Button>تاكيد</Button>
    </Form>
  )
}

export default CarouselForm
