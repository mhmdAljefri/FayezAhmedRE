import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getPurposes from "app/admin/purposes/queries/getPurposes"

const ITEMS_PER_PAGE = 100

export const PurposesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ purposes, hasMore }] = usePaginatedQuery(getPurposes, {
    orderBy: { id: "asc" },
    where: {},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      {purposes.map((purpose) => (
        <p key={purpose.id}>{purpose.name}</p>
      ))}

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PurposesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/purposes/new">
          <a>اضافة غرض</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PurposesList />
      </Suspense>
    </div>
  )
}

PurposesPage.getLayout = (page) => <AdminLayout title={"Purposes"}>{page}</AdminLayout>

export default PurposesPage
