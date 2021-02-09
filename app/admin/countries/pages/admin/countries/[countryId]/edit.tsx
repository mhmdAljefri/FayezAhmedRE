import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getCountry from "app/admin/countries/queries/getCountry"
import updateCountry from "app/admin/countries/mutations/updateCountry"
import CountryForm from "app/admin/countries/components/CountryForm"

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
          try {
            const updated = await updateCountryMutation({
              where: { id: country.id },
              data: values,
            })
            await setQueryData(updated)
            alert("Success!")
            router.push(`/admin/countries/`)
          } catch (error) {
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
