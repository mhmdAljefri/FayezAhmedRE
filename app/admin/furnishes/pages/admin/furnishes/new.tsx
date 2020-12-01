import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createFurnish from "app/admin/furnishes/mutations/createFurnish"
import FurnishForm from "app/admin/furnishes/components/FurnishForm"

const NewFurnishPage: BlitzPage = () => {
  const router = useRouter()
  const [createFurnishMutation] = useMutation(createFurnish)

  return (
    <div>
      <h1>اضافة اثاث</h1>

      <FurnishForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            const furnish = await createFurnishMutation({ data })
            alert("Success!" + JSON.stringify(furnish))
            router.push(`/admin/furnishes/`)
          } catch (error) {
            alert("Error creating furnish " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

NewFurnishPage.getLayout = (page) => <AdminLayout title={"Create New Furnish"}>{page}</AdminLayout>

export default NewFurnishPage
