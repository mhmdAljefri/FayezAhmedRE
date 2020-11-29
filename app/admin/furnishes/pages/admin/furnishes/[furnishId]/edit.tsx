import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getFurnish from "app/admin/furnishes/queries/getFurnish"
import updateFurnish from "app/admin/furnishes/mutations/updateFurnish"
import FurnishForm from "app/admin/furnishes/components/FurnishForm"

export const EditFurnish = () => {
  const router = useRouter()
  const furnishId = useParam("furnishId", "number")
  const [furnish, { setQueryData }] = useQuery(getFurnish, { where: { id: furnishId } })
  const [updateFurnishMutation] = useMutation(updateFurnish)

  return (
    <div>
      <h1>Edit Furnish {furnish.id}</h1>
      <pre>{JSON.stringify(furnish)}</pre>

      <FurnishForm
        initialValues={furnish}
        onSubmit={async () => {
          try {
            const updated = await updateFurnishMutation({
              where: { id: furnish.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/admin/furnishes/`)
          } catch (error) {
            console.log(error)
            alert("Error creating furnish " + JSON.stringify(error, null, 2))
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
