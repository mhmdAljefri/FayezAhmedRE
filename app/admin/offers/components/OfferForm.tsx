import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { Button, Card, Label } from "theme-ui"
import { FieldArray } from "react-final-form-arrays"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import LabeledMenuField from "app/admin/components/LabeledMenuField"
import getCountries from "app/admin/countries/queries/getCountries"
import { usePaginatedQuery } from "blitz"
import UploadVideo from "./UploadVideo"
import InstallmentPalnField from "./InstallmentPalnField"
import getProjects from "app/admin/projects/queries/getProjects"
import { Field, useFormState } from "react-final-form"
import * as z from "zod"
import ReactReachTextEditor from "app/admin/components/ReactReachTextEditor"

type OfferFormProps = {
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

const Schema = z.object({
  name: z.string(),
  details: z.string(),
  image: z.string(),
  countryId: z.string(),
})

const ProjectsListField = () => {
  const {
    values: { countryId },
  } = useFormState()
  const parsedId = countryId ? parseInt(countryId) : undefined
  const [{ projects }] = usePaginatedQuery(getProjects, {
    where: { countryId: parsedId },
  })
  if (!countryId) return <div />
  return (
    <LabeledMenuField
      getLabel={(country) => country.name}
      getValue={(country) => country.id as number}
      options={projects}
      name="projectId"
      label="المشروع"
    />
  )
}
const OfferForm = ({ initialValues, onSubmit }: OfferFormProps) => {
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
        schema={Schema}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        <LabeledTextField required name="name" label="العنوان" />
        <Field
          name="details"
          render={({ input }) => (
            <>
              <Label>التفاصيل</Label>
              <ReactReachTextEditor {...input} />
            </>
          )}
        />
        <MediaWidthTextField name="image" label="صورة المشروع" />

        <LabeledMenuField
          getLabel={(country) => country.name}
          getValue={(country) => country.id as number}
          options={countries}
          name="countryId"
          label="الدولة"
          required
        />
        <ProjectsListField />
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

        <MediaWidthTextField accept=".pdf" name="brochure" label="البروشور" />

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

        {/* <FieldArray name="nearBy">
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
        </FieldArray> */}
        <MediaWidthTextField multiple name="gallery" label="معرض الصور" />

        <Button sx={{ marginY: 2, marginRight: "auto", display: "block", width: 150 }}>
          تاكيد
        </Button>
      </Form>
    </Card>
  )
}

export default OfferForm
