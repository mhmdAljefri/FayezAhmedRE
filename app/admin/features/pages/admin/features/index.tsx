import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getFeatures from "app/admin/features/queries/getFeatures"
import DynamicTable from "app/components/Tables/DynamicTable"
import { Button } from "theme-ui"

const ITEMS_PER_PAGE = 100

const HEADERS = [
  { name: "", key: "id" },
  { name: "الميزة", key: "name" },
]

export const FeaturesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ features, hasMore }] = usePaginatedQuery(getFeatures, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={HEADERS}
      hasMore={hasMore}
      data={features || []}
      onNext={goToNextPage}
      onPrev={goToPreviousPage}
    />
  )
}

const FeaturesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/features/new">
          <Button>اضافة ميزة</Button>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturesList />
      </Suspense>
    </div>
  )
}

FeaturesPage.getLayout = (page) => <AdminLayout title={"Features"}>{page}</AdminLayout>

export default FeaturesPage
