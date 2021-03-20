import React from "react"
import Form from "app/components/Form"
import { Box, Button, Grid, Label, Flex, Radio } from "theme-ui"
import { Country } from "@prisma/client"
import LabeledTextField from "app/components/LabeledTextField"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import { FieldArray } from "react-final-form-arrays"
import { Field } from "react-final-form"

type CountryFormData = {
  suspend: "1" | "0"
} & Omit<Country, "suspend">
type CountryFormProps = {
  initialValues: any
  onSubmit: (values: CountryFormData) => Promise<any>
}

const CountryForm = ({ initialValues, onSubmit }: CountryFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="تسمية الدولة" />
      <MediaWidthTextField name="image" label="صورة الدولة" />

      <Field
        name="suspend"
        render={({ input }) => (
          <>
            <Label>ايقاف</Label>

            <Flex>
              <Label>
                <Radio {...input} checked={input.value === "1"} value={"1"} />
                نعم
              </Label>
              <Label>
                <Radio {...input} checked={input.value === "0"} value={"0"} />
                لا
              </Label>
            </Flex>
          </>
        )}
      />
      <FieldArray name="carousel">
        {({ fields }) => (
          <>
            {fields.map((name, index) => (
              <div key={index}>
                <Grid columns={[1, 2]}>
                  <Box>
                    <MediaWidthTextField name={`${name}.image`} label="صور السلايدر المتحرك" />
                    <LabeledTextField name={`${name}.url`} label="رابط الشريحة" />
                  </Box>
                  <Button
                    variant="link"
                    sx={{ marginY: 2 }}
                    type="button"
                    onClick={() => fields.remove(index)}
                  >
                    حدف الشريحة
                  </Button>
                </Grid>
              </div>
            ))}
            <Button
              variant="link"
              sx={{ marginY: 2, justifySelf: "flex-end" }}
              type="button"
              onClick={() => fields.push({})}
            >
              اضافة شريحة
            </Button>
          </>
        )}
      </FieldArray>

      <Button sx={{ marginY: 2, marginRight: "auto", display: "block", width: 150 }}>تاكيد</Button>
    </Form>
  )
}

export default CountryForm
