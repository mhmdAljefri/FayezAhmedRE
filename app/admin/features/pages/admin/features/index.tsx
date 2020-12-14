import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import getFeatures from "app/admin/features/queries/getFeatures"
import DynamicTable from "app/components/Tables/DynamicTable"
import { Button } from "theme-ui"
import Action from "app/admin/components/Action"
import deleteFeature from "app/admin/features/mutations/deleteFeature"

const ITEMS_PER_PAGE = 100

export const FeaturesList = () => {
  const router = useRouter()
  const [deleteFeatureMutation] = useMutation(deleteFeature)
  const page = Number(router.query.page) || 0
  const [{ features, hasMore }, { refetch }] = usePaginatedQuery(getFeatures, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const handleDelete = (id) => deleteFeatureMutation({ where: { id } }).then(() => refetch())
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={[
        { name: "", key: "id" },
        { name: "الخدمة", key: "name" },
        { name: "", render: (id) => <Action onDelete={() => handleDelete(id)} id={id} /> },
      ]}
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
          <Button>اضافة خدمة</Button>
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
