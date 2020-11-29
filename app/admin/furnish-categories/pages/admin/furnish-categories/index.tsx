import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getFurnishCategories from "app/admin/furnish-categories/queries/getFurnishCategories"
import DynamicTable from "app/components/Tables/DynamicTable"

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
    <DynamicTable
      headers={[
        {
          name: "",
          key: "id",
        },
        { name: "الصنف", key: "name" },
      ]}
      data={furnishCategories}
      onNext={goToNextPage}
      hasMore={hasMore}
      onPrev={goToPreviousPage}
    />
  )
}

const FurnishCategoriesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/furnish-categories/new">
          <a>اضافة صنف</a>
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
