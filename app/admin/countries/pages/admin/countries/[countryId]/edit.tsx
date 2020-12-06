import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getCountry from "app/admin/countries/queries/getCountry"
import updateCountry from "app/admin/countries/mutations/updateCountry"
import CountryForm from "app/admin/countries/components/CountryForm"
import { CountryUpdateInput } from "@prisma/client"

export const EditCountry = () => {
  const router = useRouter()
  const countryId = useParam("countryId", "number")
  const [country, { setQueryData }] = useQuery(getCountry, { where: { id: countryId } })
  const [updateCountryMutation] = useMutation(updateCountry)
  return (
    <div>
      <h1>تعديل على بيانات دولة {country.name}</h1>

      <CountryForm
        initialValues={country}
        onSubmit={async (values) => {
          const data: CountryUpdateInput & { id?: number } = values
          delete data.id
          try {
            const updated = await updateCountryMutation({
              where: { id: country.id },
              data: values,
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/admin/countries/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating country ")
          }
        }}
      />
    </div>
  )
}

const EditCountryPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCountry />
      </Suspense>
    </div>
  )
}

EditCountryPage.getLayout = (page) => <AdminLayout title={"Edit Country"}>{page}</AdminLayout>

export default EditCountryPage
