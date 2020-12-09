import LabeledMenuField from "app/admin/components/LabeledMenuField"
import getCountries from "app/admin/countries/queries/getCountries"
import LabeledTextField from "app/components/LabeledTextField"
import { usePaginatedQuery } from "blitz"
import React from "react"
import { useFormState } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import { Button, Flex, Grid } from "theme-ui"

export default function RoomsField(props) {
  const [{ countries }] = usePaginatedQuery(getCountries, {})
  const { values } = useFormState()

  console.log({ values })
  const country = countries.find((c) => c.id.toString() === values.countryId?.toString())

  return (
    <FieldArray name="roomsWithPrices">
      {({ fields }) => (
        <Flex sx={{ flexWrap: "wrap" }}>
          {fields.map((name, index) => (
            <>
              <div key={name}>
                <Grid columns={[2, 3, 4]}>
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
                </Grid>
              </div>

              <Button
                variant="link"
                sx={{ marginY: 2 }}
                type="button"
                onClick={() => fields.remove(index)}
              >
                حدف نوع الغرفة
              </Button>
            </>
          ))}
          <Button
            variant="link"
            sx={{ marginY: 2, justifySelf: "flex-end" }}
            type="button"
            onClick={() => fields.push({})}
          >
            اضافة نوع غرفة
          </Button>
        </Flex>
      )}
    </FieldArray>
  )
}
