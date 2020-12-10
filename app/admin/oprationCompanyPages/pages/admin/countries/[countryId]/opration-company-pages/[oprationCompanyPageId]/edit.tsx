import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getOprationCompanyPage from "app/admin/oprationCompanyPages/queries/getOprationCompanyPage"
import updateOprationCompanyPage from "app/admin/oprationCompanyPages/mutations/updateOprationCompanyPage"
import OprationCompanyPageForm from "app/admin/oprationCompanyPages/components/OprationCompanyPageForm"
import { toast } from "react-toastify"

export const EditOprationCompanyPage = () => {
  const router = useRouter()
  const oprationCompanyPageId = useParam("oprationCompanyPageId", "number")
  const countryId = useParam("countryId", "number") as number
  const [oprationCompanyPage, { setQueryData }] = useQuery(getOprationCompanyPage, {
    where: { id: oprationCompanyPageId },
  })
  const [updateOprationCompanyPageMutation] = useMutation(updateOprationCompanyPage)

  return (
    <div>
      <h1>التعديل {oprationCompanyPage.id}</h1>
      <pre>{JSON.stringify(oprationCompanyPage)}</pre>

      <OprationCompanyPageForm
        initialValues={oprationCompanyPage}
        onSubmit={async (data) => {
          try {
            const updated = await updateOprationCompanyPageMutation({
              where: { id: oprationCompanyPage.id },
              data,
              countryId,
            })
            await setQueryData(updated)
            toast.success("تمت العملية!")
            router.push(`/admin/countries/${countryId}/opration-company-pages/`)
          } catch (error) {
            console.log(error)
            alert("Error editing oprationCompanyPage " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditOprationCompanyPagePage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOprationCompanyPage />
      </Suspense>

      <p>
        <Link href={`/admin/countries/${countryId}/opration-company-page`}>
          <a>العودة للقائمة</a>
        </Link>
      </p>
    </div>
  )
}

EditOprationCompanyPagePage.getLayout = (page) => (
  <AdminLayout title={"Edit OprationCompanyPage"}>{page}</AdminLayout>
)

export default EditOprationCompanyPagePage
