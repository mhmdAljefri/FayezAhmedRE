import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createFurnishCategory from "app/admin/furnish-categories/mutations/createFurnishCategory"
import FurnishCategoryForm from "app/admin/furnish-categories/components/FurnishCategoryForm"
import { toast } from "react-toastify"

const NewFurnishCategoryPage: BlitzPage = () => {
  const router = useRouter()
  const [createFurnishCategoryMutation] = useMutation(createFurnishCategory)

  return (
    <div>
      <h1>اضافة صنف للمفروشات</h1>

      <FurnishCategoryForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            const furnishCategory = await createFurnishCategoryMutation({
              data,
            })
            toast.success("تمت عملية الاضافة بنجاح" + JSON.stringify(furnishCategory))
            router.push(`/admin/furnish-categories/`)
          } catch (error) {
            toast.success("فشل في عملية الاضافة " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

NewFurnishCategoryPage.getLayout = (page) => (
  <AdminLayout title={"Create New FurnishCategory"}>{page}</AdminLayout>
)

export default NewFurnishCategoryPage
