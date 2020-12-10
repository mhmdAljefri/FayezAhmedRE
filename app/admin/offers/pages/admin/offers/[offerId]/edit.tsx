import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getOffer from "app/admin/offers/queries/getOffer"
import updateProject from "app/admin/offers/mutations/updateProject"
import OfferForm from "app/admin/offers/components/OfferForm"
import { toast } from "react-toastify"

export const EditProject = () => {
  const router = useRouter()
  const offerId = useParam("offerId", "number")
  const [offfer] = useQuery(getOffer, { where: { id: offerId } })
  const [updateProjectMutation] = useMutation(updateProject)

  const initialValues = { ...offfer, countryId: offfer.country.id }

  return (
    <div>
      <h1>تعديل العرض {offfer.name}</h1>

      <OfferForm
        initialValues={initialValues}
        onSubmit={async (values) => {
          const countryId = parseInt(values.countryId)
          const roomsWithPrices = values.roomsWithPrices
          delete values.id
          delete values.countryId
          delete values.propertyTypeId
          delete values.roomsWithPrices

          try {
            await updateProjectMutation({
              where: { id: offfer.id },
              data: values,
              countryId,
              roomsWithPrices,
            })
            toast.success("تم التعديل بنجاح!")
            router.push(`/admin/offers/`)
          } catch (error) {
            console.log(error)
            toast.error("فشل في عملية التعديل!")
          }
        }}
      />
    </div>
  )
}

const EditProjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject />
      </Suspense>

      <p>
        <Link href="/admin/offers">
          <a>العودة للعروض</a>
        </Link>
      </p>
    </div>
  )
}

EditProjectPage.getLayout = (page) => <AdminLayout title={"Edit Project"}>{page}</AdminLayout>

export default EditProjectPage
