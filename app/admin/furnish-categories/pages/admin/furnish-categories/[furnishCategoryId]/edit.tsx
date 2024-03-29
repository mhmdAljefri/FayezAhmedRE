import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getFurnishCategory from "app/admin/furnish-categories/queries/getFurnishCategory"
import updateFurnishCategory from "app/admin/furnish-categories/mutations/updateFurnishCategory"
import FurnishCategoryForm from "app/admin/furnish-categories/components/FurnishCategoryForm"

export const EditFurnishCategory = () => {
  const router = useRouter()
  const furnishCategoryId = useParam("furnishCategoryId", "number")
  const [furnishCategory, { setQueryData }] = useQuery(getFurnishCategory, {
    where: { id: furnishCategoryId },
  })
  const [updateFurnishCategoryMutation] = useMutation(updateFurnishCategory)

  return (
    <div>
      <h1> {furnishCategory.id}</h1>
      <pre>{JSON.stringify(furnishCategory)}</pre>

      <FurnishCategoryForm
        initialValues={furnishCategory}
        onSubmit={async (data) => {
          try {
            const updated = await updateFurnishCategoryMutation({
              where: { id: furnishCategory.id },
              data,
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/admin/furnish-categories/`)
          } catch (error) {
            console.log(error)
            alert("Error creating furnishCategory " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditFurnishCategoryPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFurnishCategory />
      </Suspense>
    </div>
  )
}

EditFurnishCategoryPage.getLayout = (page) => (
  <AdminLayout title={"Edit FurnishCategory"}>{page}</AdminLayout>
)

export default EditFurnishCategoryPage
