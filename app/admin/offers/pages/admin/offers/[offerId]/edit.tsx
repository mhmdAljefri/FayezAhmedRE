import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getOffer from "app/admin/offers/queries/getOffer"
import updateOffer from "app/admin/offers/mutations/updateOffer"
import OfferForm from "app/admin/offers/components/OfferForm"
import { toast } from "react-toastify"

export const EditOffer = () => {
  const router = useRouter()
  const offerId = useParam("offerId", "number")
  const [offer, { setQueryData }] = useQuery(getOffer, { where: { id: offerId } })
  const [updateOfferMutation] = useMutation(updateOffer)

  return (
    <div>
      <h1>تعديل العرض {offer.id}</h1>
      <pre>{JSON.stringify(offer)}</pre>

      <OfferForm
        initialValues={offer}
        onSubmit={async (data) => {
          const projectId = parseInt(data.projectId.toString())

          try {
            const updated = await updateOfferMutation({
              where: { id: offer.id },
              data,
              projectId,
            })
            await setQueryData(updated)
            toast.success("Success!")
          } catch (error) {
            console.log(error)
            alert("Error editing offer " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditOfferPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOffer />
      </Suspense>

      <p>
        <Link href="/admin/offers">
          <a>Offers</a>
        </Link>
      </p>
    </div>
  )
}

EditOfferPage.getLayout = (page) => <AdminLayout title={"Edit Offer"}>{page}</AdminLayout>

export default EditOfferPage
