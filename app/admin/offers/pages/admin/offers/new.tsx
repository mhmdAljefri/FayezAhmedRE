import AdminLayout from "app/layouts/AdminLayout"
import { Link, useMutation, BlitzPage, useRouter } from "blitz"
import createOffer from "app/admin/offers/mutations/createOffer"
import OfferForm from "app/admin/offers/components/OfferForm"

const NewOfferPage: BlitzPage = () => {
  const [createOfferMutation] = useMutation(createOffer)
  const router = useRouter()
  return (
    <div>
      <h1>انشاء عرض</h1>

      <OfferForm
        initialValues={{}}
        onSubmit={async (values) => {
          const countryId = parseInt(values.countryId)
          delete values.countryId
          delete values.roomsWithPrices

          try {
            await createOfferMutation({
              data: values,
              countryId,
            })
            router.push("/admin/offers")
          } catch (error) {
            alert("Error creating project " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/projects">
          <a>المشاريع</a>
        </Link>
      </p>
    </div>
  )
}

NewOfferPage.getLayout = (page) => <AdminLayout title={"Create New Offer"}>{page}</AdminLayout>

export default NewOfferPage
