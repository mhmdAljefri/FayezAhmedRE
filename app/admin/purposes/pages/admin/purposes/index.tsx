import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import getPurposes from "app/admin/purposes/queries/getPurposes"
import deletePurpose from "app/admin/purposes/mutations/deletePurpose"
import DynamicTable from "app/components/Tables/DynamicTable"
import Action from "app/admin/components/Action"

const ITEMS_PER_PAGE = 100

export const PurposesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ purposes, hasMore }, { refetch }] = usePaginatedQuery(getPurposes, {
    orderBy: { id: "asc" },
    where: {},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [deletePurposeMutation] = useMutation(deletePurpose)

  const handleDelete = (id) => deletePurposeMutation({ where: { id } }).then(() => refetch())
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={[
        { name: "", key: "id" },
        { name: "", key: "name" },
        { name: "", render: ({ id }) => <Action onDelete={() => handleDelete(id)} id={id} /> },
      ]}
      onPrev={goToPreviousPage}
      onNext={goToNextPage}
      data={purposes}
      hasMore={hasMore}
    />
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
