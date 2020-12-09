import AdminLayout from "app/layouts/AdminLayout"
import { Link, useMutation, BlitzPage } from "blitz"
import createOffer from "app/admin/offers/mutations/createOffer"
import OfferForm from "app/admin/offers/components/OfferForm"
import { toast } from "react-toastify"

const NewOfferPage: BlitzPage = () => {
  const [createOfferMutation] = useMutation(createOffer)

  return (
    <div>
      <h1>Create New Offer</h1>

      <OfferForm
        initialValues={{}}
        onSubmit={async (data) => {
          const projectId = parseInt(data.projectId.toString())
          delete (data as any).projectId
          try {
            await createOfferMutation({ data, projectId })
            toast.success("Success!")
          } catch (error) {
            alert("Error creating offer " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/admin/offers">
          <a>العودة للعروض</a>
        </Link>
      </p>
    </div>
  )
}

NewOfferPage.getLayout = (page) => <AdminLayout title={"Create New Offer"}>{page}</AdminLayout>

export default NewOfferPage
