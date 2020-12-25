import OprationCompanyPageForm from "app/admin/oprationCompanyPages/components/OprationCompanyPageForm"
import createOprationCompanyPage from "app/admin/oprationCompanyPages/mutations/createOprationCompanyPage"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useMutation, useParam, BlitzPage } from "blitz"
import { toast } from "react-toastify"

const NewOprationCompanyPagePage: BlitzPage = () => {
  const router = useRouter()
  const countryId = useParam("countryId", "number") as number
  const [createOprationCompanyPageMutation] = useMutation(createOprationCompanyPage)

  return (
    <div>
      <h1>اضافة شركة عاملة</h1>

      <OprationCompanyPageForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            await createOprationCompanyPageMutation({
              data,
              countryId,
            })
            toast.success("تمت العملية بنجاح!")
            router.push(`/admin/countries/${countryId}/opration-company-pages/`)
          } catch (error) {
            alert("Error creating oprationCompanyPage " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href={`/countries/${countryId}/opration-company-page`}>
          <a>العودة لصفحة الشركات العاملة</a>
        </Link>
      </p>
    </div>
  )
}

NewOprationCompanyPagePage.getLayout = (page) => (
  <AdminLayout title={"اضافة شركة عاملة"}>{page}</AdminLayout>
)

export default NewOprationCompanyPagePage
