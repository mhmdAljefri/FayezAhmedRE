import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createPropertyType from "app/admin/propert-types/mutations/createPropertType"
import PropertyTypeForm from "app/admin/propert-types/components/PropertTypeForm"

const NewPropertyTypePage: BlitzPage = () => {
  const router = useRouter()
  const [createPropertyTypeMutation] = useMutation(createPropertyType)

  return (
    <div>
      <h1>انشاء نوع عقار</h1>

      <PropertyTypeForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            const furnishCategory = await createPropertyTypeMutation({
              data,
            })
            alert("تمت الاضافة!" + JSON.stringify(furnishCategory))
            router.push(`/admin/propert-types/`)
          } catch (error) {
            alert("فشل في الاضافة")
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
