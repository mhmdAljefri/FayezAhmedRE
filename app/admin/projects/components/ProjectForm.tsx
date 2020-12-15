import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Box, Button, Card, Heading, Label } from "theme-ui"
import { FieldArray } from "react-final-form-arrays"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import LabeledMenuField from "app/admin/components/LabeledMenuField"
import getCountries from "app/admin/countries/queries/getCountries"
import { usePaginatedQuery } from "blitz"
import UploadVideo from "./UploadVideo"
import RoomsField from "./RoomsFiels"
import InstallmentPalnField from "./InstallmentPalnField"
import * as z from "zod"
import { Field, useFormState } from "react-final-form"
import getCities from "app/admin/cities/queries/getCities"
import ReactReachTextEditor from "app/admin/components/ReactReachTextEditor"
import DatePicker from "react-datepicker"
import UploadMainVideo from "./UploadMainVideo"
import { PROJECT_STATUS, TURKEY_PROJECT_STATUS } from "app/constants"
import PropertyTypesField from "./PropertyTypesField"

type ProjectFormProps = {
  initialValues: any
  onSubmit: (values: any) => {}
}

// model Project {
//   id                        Int             @default(autoincrement()) @id
//   createdAt                 DateTime        @default(now())
//   updatedAt                 DateTime        @updatedAt
//   paymentType               PAYMENT_TYPES   @default(cash)
//   status                    STATUS          @default(inprogress)
//   country                   Country         @relation(fields: [countryId], references: [id])
//   countryId                 Int
//   propertyType              PropertyType?   @relation(fields: [propertyTypeId], references: [id])
//   propertyTypeId            Int?

//   name                      String
//   subTitle                  String
//   details                   String
//   complationDate            DateTime?
//   image                     String?
//   gallery                   String[]
//   floorplan                 String[]
//   features                  String[]
//   brochure                  String?
//   constructingUpdateVideo   String?
//   constructingUpdatePrview  String?
//   nearBy                    Json?
//   roomsWithPrices           RoomWithPrice[]
//   location                  Json?
//   installmentPlan           Json?
//   locationText              String?
//   oprationCompanies         Json?
// }

const Schema = z.object({
  name: z.string(),
  subTitle: z.string(),
  details: z.string(),
  image: z.string(),
  countryId: z.string(),
  propertyTypeId: z.string(),
  cityId: z.string(),
})

const CitiesListField = () => {
  const {
    values: { countryId },
  } = useFormState()
  const parsedId = countryId ? parseInt(countryId) : undefined
  const [{ cities }] = usePaginatedQuery(getCities, {
    where: { countryId: parsedId },
  })
  if (!countryId) return <div />
  return (
    <LabeledMenuField
      getLabel={(country) => country.name}
      getValue={(country) => country.id as number}
      options={cities}
      name="cityId"
      label="المدينة"
    />
  )
}

const StatusField = ({ countries }) => {
  const {
    values: { countryId },
  } = useFormState()
  const selectedCountry = countries.find(
    (country) => country.id.toString() === countryId?.toString()
  )

  return (
    <LabeledMenuField
      options={selectedCountry?.isTurkey ? TURKEY_PROJECT_STATUS : PROJECT_STATUS}
      name="status"
      getLabel={(item) => item.name}
      getValue={(item) => item.id}
      label="حالة المشروع"
    />
  )
}

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
      <Form schema={Schema} onSubmit={onSubmit} initialValues={initialValues}>
        <LabeledTextField required name="name" label="العنوان" />
        <LabeledTextField required name="subTitle" label="العنوان الفرعي" />
        <Field
          name="details"
          render={({ input }) => (
            <>
              <Label>التفاصيل</Label>
              <ReactReachTextEditor {...input} />
            </>
          )}
        />

        <Field
          name="complationDate"
          render={({ input }) => (
            <>
              <Label>تاريخ التسليم</Label>
              <DatePicker selected={input.value} {...input} />
            </>
          )}
        />

        <MediaWidthTextField name="image" label="صورة المشروع" />
        <UploadMainVideo />

        <PropertyTypesField />
        <LabeledMenuField
          getLabel={(country) => country.name}
          getValue={(country) => country.id as number}
          options={countries}
          name="countryId"
          label="الدولة"
          required
        />
        <CitiesListField />

        <StatusField countries={countries} />
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
        <MediaWidthTextField multiple name="floorplan" label="مخططات الشقق" />

        <Button sx={{ marginY: 2, marginRight: "auto", display: "block", width: 150 }}>
          تاكيد
        </Button>
      </Form>
    </Card>
  )
}

export default ProjectForm
