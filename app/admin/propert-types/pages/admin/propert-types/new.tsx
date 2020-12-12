import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createPropertyType from "app/admin/propert-types/mutations/createPropertType"
import PropertyTypeForm from "app/admin/propert-types/components/PropertTypeForm"

const NewPropertyTypePage: BlitzPage = () => {
  const router = useRouter()
  const [createPropertyTypeMutation] = useMutation(createPropertyType)

  return (
    <div>
      <h1>انشاء صنف للمفروشات</h1>

      <PropertyTypeForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            const furnishCategory = await createPropertyTypeMutation({
              data,
            })
            alert("Success!" + JSON.stringify(furnishCategory))
            router.push(`/admin/propert-types/`)
          } catch (error) {
            alert("Error creating furnishCategory " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

NewPropertyTypePage.getLayout = (page) => (
  <AdminLayout title={"Create New PropertyType"}>{page}</AdminLayout>
)

export default NewPropertyTypePage
