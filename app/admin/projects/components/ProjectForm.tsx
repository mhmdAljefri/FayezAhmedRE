import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Box, Button, Card, Heading } from "theme-ui"
import { FieldArray } from "react-final-form-arrays"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import LabeledMenuField from "app/admin/components/LabeledMenuField"
import getCountries from "app/admin/countries/queries/getCountries"
import { usePaginatedQuery } from "blitz"
import UploadVideo from "./UploadVideo"
import RoomsField from "./RoomsFiels"
import InstallmentPalnField from "./InstallmentPalnField"

type ProjectFormProps = {
  initialValues: any
  onSubmit: (values: any) => {}
}

// model Project {
//   id                         Int      @default(autoincrement()) @id
//   createdAt                  DateTime @default(now())
//   updatedAt                  DateTime @updatedAt

//   name                      String   @unique
//   subTitle                  String
//   details                   String
//   status                    STATUS
//   gallery                   String[]
//   floorplan                 String[]
//   features                  String[]
//   brochure                  String?
//   constructingUpdateVideo   String?
//   constructingUpdatePrview  String?
//   nearBy                    Json[]
//   roomsWithPrices           Json[]
//   location                  Json
//   country                   Country  @relation(fields: [countryId], references: [id])
//   countryId                 Int
// }

const ProjectForm = ({ initialValues, onSubmit }: ProjectFormProps) => {
  const [{ countries }] = usePaginatedQuery(getCountries, {})

  return (
    <Card
      sx={{
        backgroundColor: "background",
        paddingX: 3,
        paddingY: 5,
        boxShadow: "default",
        borderRadius: "xxl",
      }}
    >
      <Form
        // mutators={arrayMutators}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        <LabeledTextField required name="name" label="العنوان" />
        <LabeledTextField required name="subTitle" label="العنوان الفرعي" />
        <LabeledTextField required name="details" label="التفاصيل" />

        <MediaWidthTextField name="image" label="صورة المشروع" />

        <LabeledMenuField
          getLabel={(country) => country.name}
          getValue={(country) => country.id as number}
          options={countries}
          name="countryId"
          label="الدولة"
          required
        />

        <LabeledMenuField
          options={[
            {
              id: "inprogress",
              name: "قيد الانشاء",
            },
            { id: "completed", name: "مكتمل" },
          ]}
          name="status"
          getLabel={(item) => item.name}
          getValue={(item) => item.id}
          label="حالة المشروع"
        />
        <LabeledMenuField
          options={[
            {
              id: "cash",
              name: "كاش",
            },
            { id: "installment", name: "تقسيط" },
          ]}
          name="paymentType"
          getLabel={(item) => item.name}
          getValue={(item) => item.id}
          label="نوع الدفع"
        />

        <InstallmentPalnField />

        <UploadVideo />

        <Box sx={{ py: 4, backgroundColor: "muted", px: 4, my: 4 }}>
          <Heading sx={{ marginBottom: 4 }}>الشركات العاملة في المشروع</Heading>
          <LabeledTextField name="oprationCompanies.owner" label="مالك المشروع" />
          <LabeledTextField name="oprationCompanies.developer" label="مطور المشروع" />
          <LabeledTextField name="oprationCompanies.contractor" label="مقاول المشروع" />
          <LabeledTextField name="oprationCompanies.principalConsultant" label="مستشار المشروع" />
          <LabeledTextField name="oprationCompanies.design" label="تصميم المشروع" />
        </Box>

        <MediaWidthTextField accept=".pdf" name="brochure" label="البروشور" />

        <RoomsField />

        <FieldArray name="features">
          {({ fields }) => (
            <div>
              {fields.map((name, index) => (
                <div key={name}>
                  <LabeledTextField name={name} label="الميزة" />

                  <Button
                    variant="link"
                    sx={{ marginY: 2 }}
                    type="button"
                    onClick={() => fields.remove(index)}
                  >
                    حدف الميزة
                  </Button>
                </div>
              ))}
              <Button
                variant="link"
                sx={{ marginY: 2 }}
                type="button"
                onClick={() => fields.push("")}
              >
                اضافة ميزة للمشروع
              </Button>
            </div>
          )}
        </FieldArray>
        <FieldArray name="nearBy">
          {({ fields }) => (
            <div>
              {fields.map((name, index) => (
                <div key={name}>
                  <LabeledTextField
                    name={`${name}.name`}
                    label="اسم المكان"
                    placeholder="على سبيل المثال (شاطئ)"
                  />
                  <LabeledTextField name={`${name}.description`} label="الوصف" />
                  <MediaWidthTextField name={`${name}.image`} label="" />
                  <Button
                    variant="link"
                    sx={{ marginY: 2 }}
                    type="button"
                    onClick={() => fields.remove(index)}
                  >
                    حدف المكان
                  </Button>
                </div>
              ))}
              <Button
                variant="link"
                sx={{ marginY: 2 }}
                type="button"
                onClick={() => fields.push({})}
              >
                اضافة مكان بالقرب من المشروع
              </Button>
            </div>
          )}
        </FieldArray>
        <MediaWidthTextField multiple name="gallery" label="معرض الصور" />
        <MediaWidthTextField multiple name="floorplan" label="صور الاسقاط" />

        <Button sx={{ marginY: 2, marginRight: "auto", display: "block", width: 150 }}>
          تاكيد
        </Button>
      </Form>
    </Card>
  )
}

export default ProjectForm
