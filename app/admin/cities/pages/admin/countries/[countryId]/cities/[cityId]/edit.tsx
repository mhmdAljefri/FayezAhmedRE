import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getCity from "app/admin/cities/queries/getCity"
import updateCity from "app/admin/cities/mutations/updateCity"
import CityForm from "app/admin/cities/components/CityForm"
import { toast } from "react-toastify"

export const EditCity = () => {
  const router = useRouter()
  const cityId = useParam("cityId", "number")
  const countryId = useParam("countryId", "number")
  const [city] = useQuery(getCity, { where: { id: cityId } })
  const [updateCityMutation] = useMutation(updateCity)

  if (!cityId) return <div />
  return (
    <div>
      <h1>Edit City {city.id}</h1>
      <pre>{JSON.stringify(city)}</pre>

      <CityForm
        initialValues={city}
        onSubmit={async (values) => {
          try {
            await updateCityMutation({
              where: { id: city.id },
              data: values,
            })
            toast.success("تمت العملية!")
            router.push(`/admin/countries/${countryId}/cities/`)
          } catch (error) {
            console.log(error)
            alert("Error editing city " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditCityPage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCity />
      </Suspense>

      <p>
        <Link href={`/admin/countries/${countryId}/cities`}>
          <a>Cities</a>
        </Link>
      </p>
    </div>
  )
}

EditCityPage.getLayout = (page) => <AdminLayout title={"Edit City"}>{page}</AdminLayout>

export default EditCityPage
