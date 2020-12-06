import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useMutation, useParam, BlitzPage } from "blitz"
import createCity from "app/admin/cities/mutations/createCity"
import CityForm from "app/admin/cities/components/CityForm"
import { toast } from "react-toastify"

const NewCityPage: BlitzPage = () => {
  const router = useRouter()
  const countryId = useParam("countryId", "number")
  const [createCityMutation] = useMutation(createCity)

  if (!countryId) return <div />

  return (
    <div>
      <h1>اضافة مدينة</h1>

      <CityForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            await createCityMutation({
              data,
              countryId,
            })
            toast.success("تمت العملية!")
            router.push(`/admin/countries/${countryId}/cities/`)
          } catch (error) {
            toast.error("فشلت العملية!")
          }
        }}
      />

      <p>
        <Link href={`/admin/countries/${countryId}/cities`}>
          <a>العودة لقائمة المدن</a>
        </Link>
      </p>
    </div>
  )
}

NewCityPage.getLayout = (page) => <AdminLayout title={"اضافة مدينة جديدة"}>{page}</AdminLayout>

export default NewCityPage
