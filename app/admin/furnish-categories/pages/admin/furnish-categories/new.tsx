import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createFurnishCategory from "app/admin/furnish-categories/mutations/createFurnishCategory"
import FurnishCategoryForm from "app/admin/furnish-categories/components/FurnishCategoryForm"

const NewFurnishCategoryPage: BlitzPage = () => {
  const router = useRouter()
  const [createFurnishCategoryMutation] = useMutation(createFurnishCategory)

  return (
    <div>
      <h1>Create New FurnishCategory</h1>

      <FurnishCategoryForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            const furnishCategory = await createFurnishCategoryMutation({
              data,
            })
            alert("Success!" + JSON.stringify(furnishCategory))
            router.push(`/admin/furnish-categories/`)
          } catch (error) {
            alert("Error creating furnishCategory " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/furnishCategories">
          <a>FurnishCategories</a>
        </Link>
      </p>
    </div>
  )
}

NewFurnishCategoryPage.getLayout = (page) => (
  <AdminLayout title={"Create New FurnishCategory"}>{page}</AdminLayout>
)

export default NewFurnishCategoryPage
