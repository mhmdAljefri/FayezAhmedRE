import LabeledMenuField from "app/admin/components/LabeledMenuField"
import getPropertyTypes from "app/admin/propert-types/queries/getPropertTypes"
import { usePaginatedQuery } from "blitz"
import React from "react"

export default function PropertyTypesField(props) {
  const [{ propertyTypes }] = usePaginatedQuery(getPropertyTypes, {})
  // const { values } = useFormState()

  // console.log({ values })
  // const country = countries.find((c) => c.id.toString() === values.countryId?.toString())

  return (
    <LabeledMenuField
      getValue={(t) => t.id}
      getLabel={(t) => t.name}
      label=""
      name="propertyTypeId"
      options={propertyTypes}
    />
  )
}
