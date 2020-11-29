import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getCarousels from "app/admin/carousels/queries/getCarousels"
import DynamicTable from "app/components/Tables/DynamicTable"

const ITEMS_PER_PAGE = 100

export const CarouselsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ carousels, hasMore }] = usePaginatedQuery(getCarousels, {
    orderBy: { id: "asc" },
    where: {},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={[{ name: "", key: "id" }]}
      onPrev={goToPreviousPage}
      onNext={goToNextPage}
      data={carousels}
      hasMore={hasMore}
    />
  )
}

const CarouselsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/carousels/new">
          <a>انشاء شريحة للمعرض</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <CarouselsList />
      </Suspense>
    </div>
  )
}

CarouselsPage.getLayout = (page) => <AdminLayout title={"Carousels"}>{page}</AdminLayout>

export default CarouselsPage
