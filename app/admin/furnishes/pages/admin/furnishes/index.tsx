import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import getFurnishes from "app/admin/furnishes/queries/getFurnishes"
import DynamicTable from "app/components/Tables/DynamicTable"
import deleteFurnish from "app/admin/furnishes/mutations/deleteFurnish"
import Action from "app/admin/components/Action"

const ITEMS_PER_PAGE = 100

export const FurnishesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteFurnishMutation] = useMutation(deleteFurnish)
  const [{ furnishes, hasMore }, { refetch }] = usePaginatedQuery(getFurnishes, {
    orderBy: { id: "asc" },
    where: {},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const handleDelete = (id) => deleteFurnishMutation({ where: { id } }).then(() => refetch())
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={[
        {
          name: "",
          key: "id",
        },
        { name: "الاثاث", key: "name" },
        {
          name: "",
          render: ({ id }) => <Action onDelete={() => handleDelete(id)} id={id} />,
        },
      ]}
      data={furnishes}
      onNext={goToNextPage}
      hasMore={hasMore}
      onPrev={goToPreviousPage}
    />
  )
}

const FurnishesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/furnishes/new">
          <a>اضافة اثاث</a>
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
