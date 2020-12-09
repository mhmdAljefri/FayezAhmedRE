import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getOffer from "app/admin/offers/queries/getOffer"
import deleteOffer from "app/admin/offers/mutations/deleteOffer"

export const Offer = () => {
  const router = useRouter()
  const offerId = useParam("offerId", "number")
  const [offer] = useQuery(getOffer, { where: { id: offerId } })
  const [deleteOfferMutation] = useMutation(deleteOffer)

  return (
    <div>
      <h1>Offer {offer.id}</h1>
      <pre>{JSON.stringify(offer, null, 2)}</pre>

      <Link href={`/offers/${offer.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteOfferMutation({ where: { id: offer.id } })
            router.push("/offers")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowOfferPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/offers">
          <a>Offers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Offer />
      </Suspense>
    </div>
  )
}

ShowOfferPage.getLayout = (page) => <Layout title={"Offer"}>{page}</Layout>

export default ShowOfferPage
