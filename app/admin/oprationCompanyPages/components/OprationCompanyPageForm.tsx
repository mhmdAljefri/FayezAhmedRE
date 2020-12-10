import { OprationCompanyPage } from "@prisma/client"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Box, Button, Heading } from "theme-ui"

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
const OprationCompanyPageForm = ({ initialValues, onSubmit }: OprationCompanyPageFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField label="العنوان" name="title" />
      <LabeledTextField label="التفاصيل (نبذة)" name="description" />
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
