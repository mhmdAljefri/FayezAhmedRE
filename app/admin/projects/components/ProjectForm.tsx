import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import UploadCloudinary from "app/admin/components/UploadCloudinary"
import { Field, useFormState } from "react-final-form"
import arrayMutators from "final-form-arrays"

import { Button, Card } from "theme-ui"
import { FieldArray } from "react-final-form-arrays"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import LabeledMenuField from "app/admin/components/LabeledMenuField"
import getCountries from "app/admin/countries/queries/getCountries"
import { usePaginatedQuery } from "blitz"

function RoomsField(props) {
  const [{ countries }] = usePaginatedQuery(getCountries, {})
  const { values } = useFormState()

  const country = countries.find((c) => c.id.toString() === values.country?.connect.id)

  return (
    <FieldArray name="roomsWithPrices.create">
      {({ fields }) => (
        <div>
          {fields.map((name, index) => (
            <div key={name}>
              <LabeledMenuField
                options={country?.rooms || []}
                name={`${name}.room`}
                label="نوع الغرفة"
              />
              <LabeledTextField
                type="number"
                required
                name={`${name}.price`}
                label="القيمة المبدئية دولار امريكي"
              />
              <LabeledTextField
                type="number"
                required
                name={`${name}.priceQatar`}
                label="القيمة المبدئية ريال قطري"
              />
              <LabeledTextField
                type="number"
                required
                name={`${name}.priceTurkey`}
                label="القيمة المبدئية ليرة تركي"
              />
              <LabeledTextField
                type="number"
                required
                name={`${name}.priceKSA`}
                label="القيمة المبدئية ريال سعودي"
              />
              <LabeledTextField
                type="number"
                required
                name={`${name}.priceUAE`}
                label="القيمة المبدئية درهم امارتي"
              />
              <LabeledTextField
                type="number"
                required
                name={`${name}.priceKuwait`}
                label="القيمة المبدئية دينار كويتي"
              />
              <LabeledTextField
                type="number"
                required
                name={`${name}.priceOman`}
                label="القيمة المبدئية ريال عمان"
              />
              <Button
                variant="link"
                sx={{ marginY: 2 }}
                type="button"
                onClick={() => fields.remove(index)}
              >
                حدف نوع الغرفة
              </Button>
            </div>
          ))}
          <Button variant="link" sx={{ marginY: 2 }} type="button" onClick={() => fields.push({})}>
            اضافة نوع غرفة
          </Button>
        </div>
      )}
    </FieldArray>
  )
}

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
        mutators={arrayMutators}
        getValues={(val) => console.log(val)}
        onSubmit={onSubmit}
        initialValues={{
          status: "inprogress",
          location: {
            latitude: "",
            longitude: "",
          },
          ...initialValues,
        }}
      >
        <LabeledTextField required name="name" label="العنوان" />
        <LabeledTextField required name="subTitle" label="العنوان الفرعي" />
        <LabeledTextField required name="details" label="التفاصيل" />

        <MediaWidthTextField name="image" label="صورة المشروع" />

        <LabeledMenuField
          getLabel={(country) => country.name}
          getValue={(country) => country.id as number}
          options={[{ name: "اختر الدولة", id: "" }, ...countries]}
          name="country.connect.id"
          label="الدولة"
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

        <MediaWidthTextField
          name="constructingUpdateVideo"
          accept="video/*"
          label="فيديو حالة المشروع"
        />

        <MediaWidthTextField name="constructingUpdatePrview" label="صورة عرض لفيديو حالة المشروع" />

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
                اضافة مكان بالقرب من المشروع{" "}
              </Button>
            </div>
          )}
        </FieldArray>
        <FieldArray name="gallery">
          {({ fields }) => (
            <div>
              {fields.map((name, index) => (
                <div key={name}>
                  <Field
                    render={({ input }) => (
                      <UploadCloudinary {...input} onChange={(data) => input.onChange(data.url)} />
                    )}
                    name={name}
                  />
                  <Button
                    variant="link"
                    sx={{ marginY: 2 }}
                    type="button"
                    onClick={() => fields.remove(index)}
                  >
                    حدف الصورة من المعرض
                  </Button>
                </div>
              ))}
              <Button
                variant="link"
                sx={{ marginY: 2 }}
                type="button"
                onClick={() => fields.push("")}
              >
                اضافة صورة لمعرض الصور
              </Button>
            </div>
          )}
        </FieldArray>
        <FieldArray name="floorplan">
          {({ fields }) => (
            <div>
              {fields.map((name, index) => (
                <div key={name}>
                  <Field
                    render={({ input }) => (
                      <UploadCloudinary {...input} onChange={(data) => input.onChange(data.url)} />
                    )}
                    name={name}
                  />
                  <Button
                    variant="link"
                    sx={{ marginY: 2 }}
                    type="button"
                    onClick={() => fields.remove(index)}
                  >
                    حدف الصورة من الاسقاط
                  </Button>
                </div>
              ))}
              <Button
                variant="link"
                sx={{ marginY: 2 }}
                type="button"
                onClick={() => fields.push("")}
              >
                اضافة صورة الاسقاط
              </Button>
            </div>
          )}
        </FieldArray>
        <Button sx={{ marginY: 2, marginRight: "auto", display: "block", width: 150 }}>
          تاكيد
        </Button>
      </Form>
    </Card>
  )
}

export default ProjectForm
