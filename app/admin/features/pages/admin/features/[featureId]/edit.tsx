import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getFeature from "app/admin/features/queries/getFeature"
import updateFeature from "app/admin/features/mutations/updateFeature"
import FeatureForm from "app/admin/features/components/FeatureForm"

export const EditFeature = () => {
  const router = useRouter()
  const featureId = useParam("featureId", "number")
  const [feature, { setQueryData }] = useQuery(getFeature, { where: { id: featureId } })
  const [updateFeatureMutation] = useMutation(updateFeature)

  return (
    <div>
      <h1>تعديل {feature.id}</h1>

      <FeatureForm
        initialValues={feature}
        onSubmit={async (data) => {
          try {
            const updated = await updateFeatureMutation({
              where: { id: feature.id },
              data,
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/admin/features/`)
          } catch (error) {
            console.log(error)
            alert("Error creating feature " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditFeaturePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFeature />
      </Suspense>

      <p>
        <Link href="/features">
          <a>Features</a>
        </Link>
      </p>
    </div>
  )
}

EditFeaturePage.getLayout = (page) => <Layout title={"Edit Feature"}>{page}</Layout>

export default EditFeaturePage
