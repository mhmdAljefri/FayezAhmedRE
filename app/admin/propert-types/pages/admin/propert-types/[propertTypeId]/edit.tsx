import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getPropertType from "app/admin/propert-types/queries/getPropertType"
import updatePropertType from "app/admin/propert-types/mutations/updatePropertType"
import PropertTypeForm from "app/admin/propert-types/components/PropertTypeForm"

export const EditPropertType = () => {
  const router = useRouter()
  const propertyTypeId = useParam("propertyTypeId", "number")
  const [furnishCategory, { setQueryData }] = useQuery(getPropertType, {
    where: { id: propertyTypeId },
  })
  const [updatePropertTypeMutation] = useMutation(updatePropertType)

  return (
    <div>
      <h1>Edit PropertType {furnishCategory.id}</h1>
      <pre>{JSON.stringify(furnishCategory)}</pre>

      <PropertTypeForm
        initialValues={furnishCategory}
        onSubmit={async (data) => {
          try {
            const updated = await updatePropertTypeMutation({
              where: { id: furnishCategory.id },
              data,
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/admin/propert-types/`)
          } catch (error) {
            console.log(error)
            alert("Error creating furnishCategory " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditPropertTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPropertType />
      </Suspense>

      <p>
        <Link href="/furnishCategories">
          <a>FurnishCategories</a>
        </Link>
      </p>
    </div>
  )
}

EditPropertTypePage.getLayout = (page) => (
  <AdminLayout title={"Edit PropertType"}>{page}</AdminLayout>
)

export default EditPropertTypePage
