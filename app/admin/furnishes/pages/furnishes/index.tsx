import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getFurnishes from "app/admin/furnishes/queries/getFurnishes"

const ITEMS_PER_PAGE = 100

export const FurnishesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ furnishes, hasMore }] = usePaginatedQuery(getFurnishes, {
    orderBy: { id: "asc" },
    where: {},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {furnishes.map((furnish) => (
          <li key={furnish.id}>
            <Link href={`/furnishes/${furnish.id}`}>
              <a>{furnish.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const FurnishesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/furnishes/new">
          <a>Create Furnish</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <FurnishesList />
      </Suspense>
    </div>
  )
}

FurnishesPage.getLayout = (page) => <AdminLayout title={"Furnishes"}>{page}</AdminLayout>

export default FurnishesPage
