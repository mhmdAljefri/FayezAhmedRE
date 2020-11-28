import AdminLayout from "app/layouts/AdminLayout"
import { Link, useMutation, BlitzPage } from "blitz"
import createPartner from "app/admin/partners/mutations/createPartner"
import PartnerForm from "app/admin/partners/components/PartnerForm"

const NewPartnerPage: BlitzPage = () => {
  const [createPartnerMutation] = useMutation(createPartner)

  return (
    <div>
      <h1>إنشاء شريك جديد</h1>

      <PartnerForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            const partner = await createPartnerMutation({ data })
            alert("Success!" + JSON.stringify(partner))
          } catch (error) {
            alert("Error creating partner " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/partners">
          <a>Partners</a>
        </Link>
      </p>
    </div>
  )
}

NewPartnerPage.getLayout = (page) => <AdminLayout title={"Create New Partner"}>{page}</AdminLayout>

export default NewPartnerPage
