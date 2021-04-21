import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createPurpose from "app/admin/purposes/mutations/createPurpose"
import PurposeForm from "app/admin/purposes/components/PurposeForm"

const NewPurposePage: BlitzPage = () => {
  const router = useRouter()
  const [createPurposeMutation] = useMutation(createPurpose)

  return (
    <div>
      <h1>اضافة غرض للعقار</h1>

      <PurposeForm
        initialValues={{}}
        onSubmit={async ({ name }) => {
          try {
            await createPurposeMutation({ data: { name } })
            alert("تمت الاضافة!")
            router.push(`/admin/purposes`)
          } catch (error) {
            alert("فشل في الاضافة. تواصل مع فريق التطوير")
          }
        }}
      />
    </div>
  )
}

NewPurposePage.getLayout = (page) => <AdminLayout title={"Create New Purpose"}>{page}</AdminLayout>

export default NewPurposePage
