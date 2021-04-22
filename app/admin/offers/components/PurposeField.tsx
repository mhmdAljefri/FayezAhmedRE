import LabeledMenuField from "app/admin/components/LabeledMenuField"
import getPurposes from "app/admin/purposes/queries/getPurposes"
import { usePaginatedQuery } from "blitz"
import React from "react"

export default function PurposeField(props) {
  const [{ purposes }] = usePaginatedQuery(getPurposes, {})
  // const { values } = useFormState()

  // console.log({ values })
  // const country = countries.find((c) => c.id.toString() === values.countryId?.toString())

  return (
    <LabeledMenuField
      getValue={(t) => t.id}
      getLabel={(t) => t.name}
      label=""
      name="purposeId"
      options={purposes}
    />
  )
}
