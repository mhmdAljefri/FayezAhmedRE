import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import { useFormState } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import { Button, Flex, Grid } from "theme-ui"

export default function InstallmentPalnField(props) {
  const { values } = useFormState()

  if (values.paymentType !== "installment") return <div />

  return (
    <FieldArray defaultValue={[{}, {}, {}]} name="installmentPlan">
      {({ fields }) => (
        <Flex sx={{ flexWrap: "wrap" }}>
          {fields.map((name, index) => (
            <>
              <div key={name}>
                <Grid columns={[1, 3]}>
                  <LabeledTextField required name={`${name}.instalment`} label="عنوان الدفعة" />
                  <LabeledTextField name={`${name}.milestone`} label="موعد الدفع" />
                  <LabeledTextField
                    type="number"
                    required
                    name={`${name}.payment`}
                    label="النسبة الموئية للدفعة"
                  />
                </Grid>
              </div>

              <Button
                variant="link"
                sx={{ marginY: 2 }}
                type="button"
                onClick={() => fields.remove(index)}
              >
                حدف خطة الدفع
              </Button>
            </>
          ))}
          <Button
            variant="link"
            sx={{ marginY: 2, justifySelf: "flex-end" }}
            type="button"
            onClick={() => fields.push({})}
          >
            اضافة خطةالسداد
          </Button>
        </Flex>
      )}
    </FieldArray>
  )
}
