import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getPurpose from "app/admin/purposes/queries/getPurpose"
import deletePurpose from "app/admin/purposes/mutations/deletePurpose"

export const Purpose = () => {
  const router = useRouter()
  const purposeId = useParam("purposeId", "number")
  const [purpose] = useQuery(getPurpose, { where: { id: purposeId } })
  const [deletePurposeMutation] = useMutation(deletePurpose)

  return (
    <div>
      <h1>Purpose {purpose.id}</h1>
      <pre>{JSON.stringify(purpose, null, 2)}</pre>

      <Link href={`/purposes/${purpose.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deletePurposeMutation({ where: { id: purpose.id } })
            router.push("/purposes")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowPurposePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/purposes">
          <a>Purposes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Purpose />
      </Suspense>
    </div>
  )
}

ShowPurposePage.getLayout = (page) => <Layout title={"Purpose"}>{page}</Layout>

export default ShowPurposePage
