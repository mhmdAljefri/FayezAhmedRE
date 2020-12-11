import { OprationCompanyPage } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import ReactReachTextEditor from "app/admin/components/ReactReachTextEditor"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Field } from "react-final-form"
import { Box, Button, Heading, Label } from "theme-ui"
import * as z from "zod"

type OprationCompanyPageFormProps = {
  initialValues: any
  onSubmit: (values: OprationCompanyPage) => Promise<any>
}

// title                     String
// description               String
// image                     String?
// gallery                   String?
// video                     String?
// constructingUpdateVideo   String?
// constructingUpdatePrview  String?
// oprationCompanies         Json?

const Schema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
})

const OprationCompanyPageForm = ({ initialValues, onSubmit }: OprationCompanyPageFormProps) => {
  return (
    <Form schema={Schema} initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField label="العنوان" name="title" />
      <Field
        name="description"
        render={({ input }) => (
          <>
            <Label>التفاصيل</Label>
            <ReactReachTextEditor {...input} />
          </>
        )}
      />
      <MediaWidthTextField label="الصورة الرئيسية" name="image" />
      <MediaWidthTextField multiple label="المعرض" name="gallery" />

      <Box sx={{ py: 4, backgroundColor: "muted", px: 4, my: 4 }}>
        <MediaWidthTextField accept="video/*" label="الفيديو" name="video" />
      </Box>

      <Box>
        <MediaWidthTextField
          accept="video/*"
          label="فيد التحديثات"
          name="constructingUpdateVideo"
        />
        <MediaWidthTextField label="صورة عرض لفيديو التحديثات" name="constructingUpdatePrview" />
      </Box>

      <Box sx={{ py: 4, backgroundColor: "muted", px: 4, my: 4 }}>
        <Heading sx={{ marginBottom: 4 }}>الشركات العاملة </Heading>
        <LabeledTextField name="oprationCompanies.owner" label="مالك المشروع" />
        <LabeledTextField name="oprationCompanies.developer" label="مطور المشروع" />
        <LabeledTextField name="oprationCompanies.contractor" label="مقاول المشروع" />
        <LabeledTextField name="oprationCompanies.principalConsultant" label="مستشار المشروع" />
        <LabeledTextField name="oprationCompanies.design" label="تصميم المشروع" />
      </Box>

      <Button>تاكيد</Button>
    </Form>
  )
}

export default OprationCompanyPageForm
