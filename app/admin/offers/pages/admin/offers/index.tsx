import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getOffers from "app/admin/offers/queries/getOffers"
import DynamicTable from "app/components/Tables/DynamicTable"
import Action from "app/admin/components/Action"

const ITEMS_PER_PAGE = 100

export const OffersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ offers, hasMore }] = usePaginatedQuery(getOffers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      data={offers}
      headers={[
        {
          name: "",
          key: "id",
        },
        { name: "العنوان", key: "title" },
        { name: "وصف", key: "subTitle" },
        { name: "", render: ({ id }) => <Action id={id} /> },
      ]}
      hasMore={hasMore}
      onNext={goToNextPage}
      onPrev={goToPreviousPage}
    />
  )
}

const OffersPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/offers/new">
          <a>اضافة عرض</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <OffersList />
      </Suspense>
    </div>
  )
}

OffersPage.getLayout = (page) => <AdminLayout title={"Offers"}>{page}</AdminLayout>

export default OffersPage
