import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createFurnish from "app/admin/furnishes/mutations/createFurnish"
import FurnishForm from "app/admin/furnishes/components/FurnishForm"
import { toast } from "react-toastify"

const NewFurnishPage: BlitzPage = () => {
  const router = useRouter()
  const [createFurnishMutation] = useMutation(createFurnish)

  return (
    <div>
      <h1>اضافة اثاث</h1>

      <FurnishForm
        initialValues={{}}
        onSubmit={async (data) => {
          const furnishCategoryId = parseInt((data as any).furnishCategoryId)
          delete (data as any).furnishCategoryId

          try {
            await createFurnishMutation({
              data: {
                ...data,
                furnishCategory: {},
              },
              furnishCategoryId,
            })
            toast.success("تمت العملية بنجاح!")
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
