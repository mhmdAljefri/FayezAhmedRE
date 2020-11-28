import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getFurnishCategories from "app/admin/furnish-categories/queries/getFurnishCategories"

const ITEMS_PER_PAGE = 100

export const FurnishCategoriesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ furnishCategories, hasMore }] = usePaginatedQuery(getFurnishCategories, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {furnishCategories.map((furnishCategory) => (
          <li key={furnishCategory.id}>
            <Link href={`/furnishCategories/${furnishCategory.id}`}>
              <a>{furnishCategory.name}</a>
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

const FurnishCategoriesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/furnishCategories/new">
          <a>Create FurnishCategory</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <FurnishCategoriesList />
      </Suspense>
    </div>
  )
}

FurnishCategoriesPage.getLayout = (page) => (
  <AdminLayout title={"FurnishCategories"}>{page}</AdminLayout>
)

export default FurnishCategoriesPage
