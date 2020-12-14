import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import getCarousels from "app/admin/carousels/queries/getCarousels"
import DynamicTable from "app/components/Tables/DynamicTable"
import Action from "app/admin/components/Action"
import { Image } from "theme-ui"
import deleteCarousel from "app/admin/carousels/mutations/deleteCarousel"

const ITEMS_PER_PAGE = 100

export const CarouselsList = () => {
  const router = useRouter()
  const [deleteCarouselMutation] = useMutation(deleteCarousel)
  const page = Number(router.query.page) || 0
  const [{ carousels, hasMore }, { refetch }] = usePaginatedQuery(getCarousels, {
    orderBy: { id: "asc" },
    where: {},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const handleDelete = (id) => deleteCarouselMutation({ where: { id } }).then(() => refetch())
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={[
        { name: "", key: "id" },
        { name: "", render: ({ image }) => <Image sx={{ width: 120 }} src={image} /> },
        { name: "", render: ({ id }) => <Action onDelete={() => handleDelete(id)} id={id} /> },
      ]}
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
          <a>اضافة شريحة للمعرض</a>
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
