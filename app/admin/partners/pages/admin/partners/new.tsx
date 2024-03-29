import AdminLayout from "app/layouts/AdminLayout"
import { Link, useMutation, BlitzPage } from "blitz"
import createPartner from "app/admin/partners/mutations/createPartner"
import PartnerForm from "app/admin/partners/components/PartnerForm"
import { toast } from "react-toastify"

const NewPartnerPage: BlitzPage = () => {
  const [createPartnerMutation] = useMutation(createPartner)

  return (
    <div>
      <h1>إنشاء شريك جديد</h1>

      <PartnerForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            await createPartnerMutation({ data })
            toast.success("تمت العملية بنجاح!")
          } catch (error) {
            toast.error("فشلت العملية ")
          }
        }}
      />

      <p>
        <Link href="/admin/partners">
          <a>العودة لقائمة الشركاء</a>
        </Link>
      </p>
    </div>
  )
}

NewPartnerPage.getLayout = (page) => <AdminLayout title={"Create New Partner"}>{page}</AdminLayout>

export default NewPartnerPage
