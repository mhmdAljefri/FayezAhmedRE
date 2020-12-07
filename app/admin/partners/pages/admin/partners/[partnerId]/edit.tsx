import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getPartner from "app/admin/partners/queries/getPartner"
import updatePartner from "app/admin/partners/mutations/updatePartner"
import PartnerForm from "app/admin/partners/components/PartnerForm"
import { toast } from "react-toastify"

export const EditPartner = () => {
  const router = useRouter()
  const partnerId = useParam("partnerId", "number")
  const [partner, { setQueryData }] = useQuery(getPartner, { where: { id: partnerId } })
  const [updatePartnerMutation] = useMutation(updatePartner)

  return (
    <div>
      <h1>تعديل على ملف الشريك {partner.id}</h1>

      <PartnerForm
        initialValues={partner}
        onSubmit={async (data) => {
          try {
            const updated = await updatePartnerMutation({
              where: { id: partner.id },
              data,
            })
            await setQueryData(updated)
            toast.success("Success!")
            router.push(`/admin/partners/`)
          } catch (error) {
            toast.error("فشلت العملية")
          }
        }}
      />
    </div>
  )
}

const EditPartnerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPartner />
      </Suspense>

      <p>
        <Link href="/admin/partners">
          <a>العودة لقائمة الشركاء</a>
        </Link>
      </p>
    </div>
  )
}

EditPartnerPage.getLayout = (page) => <AdminLayout title={"Edit Partner"}>{page}</AdminLayout>

export default EditPartnerPage
