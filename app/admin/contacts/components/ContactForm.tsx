import React from "react"
import { Contact } from "@prisma/client"
import MapField from "app/admin/components/MapField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import { FieldArray } from "react-final-form-arrays"
import { Button, Grid, Text } from "theme-ui"
import * as z from "zod"

type ContactFormProps = {
  initialValues: any
  onSubmit: (
    values: Pick<Contact, "name" | "location" | "mobiles" | "phones" | "locationObject">
  ) => Promise<any>
}

const Schema = z.object({
  name: z.string(),
  location: z.string(),
  mobiles: z.array(z.string()),
  phones: z.array(z.string()),
})

const ContactForm = ({ initialValues, onSubmit }: ContactFormProps) => {
  return (
    <Form schema={Schema} initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField label="اسم الحساب" name="name" />
      <LabeledTextField label="الموقع نصياً" name="location" />

      <FieldArray name="mobiles">
        {({ fields, meta }) => (
          <div>
            {fields.map((name, index) => (
              <Grid columns={[2, 3]} key={name}>
                <LabeledTextField type="number" name={name} label="رقم الجوال" />

                <Button
                  variant="link"
                  sx={{ marginY: 2 }}
                  type="button"
                  onClick={() => fields.remove(index)}
                >
                  حدف الرقم
                </Button>
              </Grid>
            ))}
            <Button
              variant="link"
              sx={{ marginY: 2 }}
              type="button"
              onClick={() => fields.push("")}
            >
              اضافة رقم الجوال
            </Button>
            <Text sx={{ color: "red" }}>{meta.touched && meta.error}</Text>
          </div>
        )}
      </FieldArray>

      <FieldArray name="phones">
        {({ fields, meta }) => (
          <div>
            {fields.map((name, index) => (
              <Grid columns={[2, 3]} key={name}>
                <LabeledTextField type="number" name={name} label="رقم الهاتف" />

                <Button
                  variant="link"
                  sx={{ marginY: 2 }}
                  type="button"
                  onClick={() => fields.remove(index)}
                >
                  حدف الرقم
                </Button>
              </Grid>
            ))}
            <Button
              variant="link"
              sx={{ marginY: 2 }}
              type="button"
              onClick={() => fields.push("")}
            >
              اضافة رقم هاتف
            </Button>
            <Text sx={{ color: "red" }}>{meta.touched && meta.error}</Text>
          </div>
        )}
      </FieldArray>

      <MapField name="locationObject" />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default ContactForm
