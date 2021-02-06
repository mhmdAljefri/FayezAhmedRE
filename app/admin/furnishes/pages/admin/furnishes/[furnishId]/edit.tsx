import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getFurnish from "app/admin/furnishes/queries/getFurnish"
import updateFurnish from "app/admin/furnishes/mutations/updateFurnish"
import FurnishForm from "app/admin/furnishes/components/FurnishForm"
import { toast } from "react-toastify"

export const EditFurnish = () => {
  const router = useRouter()
  const furnishId = useParam("furnishId", "number")
  const [furnish, { setQueryData }] = useQuery(getFurnish, { where: { id: furnishId } })
  const [updateFurnishMutation] = useMutation(updateFurnish)

  return (
    <div>
      <h1>تعديل على {furnish.name}</h1>
      <pre>{JSON.stringify(furnish)}</pre>

      <FurnishForm
        initialValues={furnish}
        onSubmit={async (values) => {
          const furnishCategoryId = parseInt((values as any).furnishCategoryId)
          delete (values as any).furnishCategoryId
          try {
            const updated = await updateFurnishMutation({
              where: { id: furnish.id },
              data: {
                name: values.name,
                price: values.price,
                image: values.image,
                description: values.description,
              },
              furnishCategoryId,
            })
            await setQueryData(updated)
            toast.success("تمت العملية بنجاح!")
            router.push(`/admin/furnishes/`)
          } catch (error) {
            toast.error("فشلت العملية ")
          }
        }}
      />
    </div>
  )
}

const EditFurnishPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFurnish />
      </Suspense>

      <p>
        <Link href="/furnishes">
          <a>Furnishes</a>
        </Link>
      </p>
    </div>
  )
}

EditFurnishPage.getLayout = (page) => <AdminLayout title={"Edit Furnish"}>{page}</AdminLayout>

export default EditFurnishPage
