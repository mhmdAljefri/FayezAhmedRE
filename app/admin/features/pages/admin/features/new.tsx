import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createFeature from "app/admin/features/mutations/createFeature"
import FeatureForm from "app/admin/features/components/FeatureForm"
import { Box } from "theme-ui"

const NewFeaturePage: BlitzPage = () => {
  const router = useRouter()
  const [createFeatureMutation] = useMutation(createFeature)

  return (
    <Box
      sx={{
        backgroundColor: "background",
        padding: 3,
        borderRadius: "default",
        boxShadow: "default",
      }}
    >
      <h1>إضافة خدمة</h1>

      <FeatureForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            await createFeatureMutation({ data })
            router.push(`/admin/features/`)
          } catch (error) {
            alert("Error creating feature " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/admin/features">
          <a>الخدمات</a>
        </Link>
      </p>
    </Box>
  )
}

NewFeaturePage.getLayout = (page) => <AdminLayout title={"Create New Feature"}>{page}</AdminLayout>

export default NewFeaturePage
