import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getPurpose from "app/admin/purposes/queries/getPurpose"
import updatePurpose from "app/admin/purposes/mutations/updatePurpose"
import PurposeForm from "app/admin/purposes/components/PurposeForm"

export const EditPurpose = () => {
  const router = useRouter()
  const purposeId = useParam("purposeId", "number")
  const [purpose, { setQueryData }] = useQuery(getPurpose, { where: { id: purposeId } })
  const [updatePurposeMutation] = useMutation(updatePurpose)

  return (
    <div>
      <h1>Edit Purpose {purpose.id}</h1>
      <pre>{JSON.stringify(purpose)}</pre>

      <PurposeForm
        initialValues={purpose}
        onSubmit={async ({ name }) => {
          try {
            const updated = await updatePurposeMutation({
              where: { id: purpose.id },
              data: { name },
            })
            await setQueryData(updated)
            alert("تم التعديل!" + JSON.stringify(updated))
            router.push(`/admin/purposes/`)
          } catch (error) {
            console.log(error)
            alert("Error editing purpose " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditPurposePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPurpose />
      </Suspense>

      <p>
        <Link href="/purposes">
          <a>Purposes</a>
        </Link>
      </p>
    </div>
  )
}

EditPurposePage.getLayout = (page) => <AdminLayout title={"Edit Purpose"}>{page}</AdminLayout>

export default EditPurposePage
