import React from "react"
import Form from "app/components/Form"
import { Box, Button, Grid } from "theme-ui"
import { Country } from "@prisma/client"
import LabeledTextField from "app/components/LabeledTextField"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import { FieldArray } from "react-final-form-arrays"
type CountryFormProps = {
  initialValues: any
  onSubmit: (values: Country) => Promise<any>
}

const CountryForm = ({ initialValues, onSubmit }: CountryFormProps) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="name" label="تسمية الدولة" />
      <MediaWidthTextField name="image" label="صورة الدولة" />
      <FieldArray name="carousel">
        {({ fields }) => (
          <>
            {fields.map((name, index) => (
              <div key={name}>
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
