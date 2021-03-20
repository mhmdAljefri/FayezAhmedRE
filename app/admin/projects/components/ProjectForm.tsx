import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Box, Button, Card, Flex, Heading, Label, Radio } from "theme-ui"
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
import "react-datepicker/dist/react-datepicker.css"
import UploadMainVideo from "./UploadMainVideo"
import { PROJECT_STATUS, TURKEY_PROJECT_STATUS } from "app/constants"
import PropertyTypesField from "./PropertyTypesField"
import MapField from "app/admin/components/MapField"

type ProjectFormProps = {
  initialValues: any
  onSubmit: (values: any) => {}
}

const Schema = z.object({
  name: z.string(),
  subTitle: z.string(),
  details: z.string(),
  image: z.string(),
  countryId: z.string(),
  propertyTypeId: z.string(),
  cityId: z.string(),
})

// TODO make it in shared file
export const CitiesListField = () => {
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

const SeaViewAndGrantedByGoveChekBoxs = ({ countries }) => {
  const {
    values: { countryId },
  } = useFormState()
  const selectedCountry = countries.find(
    (country) => country.id.toString() === countryId?.toString()
  )

  if (!selectedCountry || !selectedCountry.isTurkey) return <div />
  return (
    <>
      <Field
        name="isDelux"
        render={({ input }) => (
          <>
            <Label>مشروع فاخر</Label>

            <Flex>
              <Label>
                <Radio {...input} name="isDelux" value="true" />
                نعم
              </Label>
              <Label>
                <Radio {...input} name="isDelux" value="false" />
                لا
              </Label>
            </Flex>
          </>
        )}
      />
      <Field
        name="isWithSeaView"
        render={({ input }) => (
          <>
            <Label>مشروع باطلالة بحرية</Label>

            <Flex>
              <Label>
                <Radio {...input} name="isWithSeaView" value="true" />
                نعم
              </Label>
              <Label>
                <Radio {...input} name="isWithSeaView" value="false" />
                لا
              </Label>
            </Flex>
          </>
        )}
      />
      <Field
        name="isGrantedByGov"
        render={({ input }) => (
          <>
            <Label>مشروع بضمان الحكومة التركية</Label>

            <Flex>
              <Label>
                <Radio {...input} name="isGrantedByGov" value="true" />
                نعم
              </Label>
              <Label>
                <Radio {...input} name="isGrantedByGov" value="false" />
                لا
              </Label>
            </Flex>
          </>
        )}
      />
    </>
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
        <SeaViewAndGrantedByGoveChekBoxs countries={countries} />
        <Field
          name="isHousingComplex"
          render={({ input }) => (
            <>
              <Label>مجمع بارز</Label>

              <Flex>
                <Label>
                  <Radio {...input} name="dark-mode" value="true" />
                  نعم
                </Label>
                <Label>
                  <Radio {...input} name="dark-mode" value="false" />
                  لا
                </Label>
              </Flex>
            </>
          )}
        />

        <LabeledTextField
          name="housingComplexText"
          placeholder="مناسب للجنسية التركية"
          label="نص خاص بالمجمعات البارزة"
        />

        <MediaWidthTextField name="housingComplexImage" label="صورة خاصة بالمجمعات البارزة" />

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

        <MapField name="location" />

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

        <LabeledTextField name="brochure" label="البروشور" />

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
