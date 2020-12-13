import { Contact } from "@prisma/client"
import Form from "app/components/Form"
import GoogleMap from "app/components/GoogleMap"
import LabeledTextField from "app/components/LabeledTextField"
import React, { useEffect, useState } from "react"
import { Field } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import { Button, Text } from "theme-ui"
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
  const [coords, setCoords] = useState({ lat: 0, lng: 0 })
  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setCoords({
            lat: res.coords.latitude,
            lng: res.coords.longitude,
          })
          console.log(res)
        },
        (error) => {
          console.error(error)
        }
      )

      return () => {}
    }
  }, [])

  return (
    <Form schema={Schema} initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField label="اسم الحساب" name="name" />
      <LabeledTextField label="الموقع نصياً" name="location" />

      <FieldArray name="mobiles">
        {({ fields, meta }) => (
          <div>
            {fields.map((name, index) => (
              <div key={name}>
                <LabeledTextField type="number" name={name} label="رقم الجوال" />

                <Button
                  variant="link"
                  sx={{ marginY: 2 }}
                  type="button"
                  onClick={() => fields.remove(index)}
                >
                  حدف الرقم
                </Button>
              </div>
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
              <div key={name}>
                <LabeledTextField type="number" name={name} label="رقم الهاتف" />

                <Button
                  variant="link"
                  sx={{ marginY: 2 }}
                  type="button"
                  onClick={() => fields.remove(index)}
                >
                  حدف الرقم
                </Button>
              </div>
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

      <Field
        name="locationObject"
        render={({ input }) => (
          <GoogleMap
            center={{ lat: input.value?.lat || coords.lat, lng: input.value?.lng || coords.lng }}
            onDragEnd={(map) => {
              input.onChange({
                lat: map.center.lat(),
                lng: map.center.lng(),
              })
            }}
          />
        )}
      />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default ContactForm
