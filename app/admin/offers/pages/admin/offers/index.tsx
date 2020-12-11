import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import DynamicTable from "app/components/Tables/DynamicTable"
import Action from "app/admin/components/Action"
import { Button } from "theme-ui"
import getOffers from "app/admin/offers/queries/getOffers"
import deleteOffer from "app/admin/offers/mutations/deleteOffer"

const ITEMS_PER_PAGE = 100

export const ProjectsList = () => {
  const [deleteProjectMutation] = useMutation(deleteOffer)

  const HEADERS = [
    { name: "", key: "id" },
    { name: "اسم العرض", key: "name" },
    {
      name: "",
      render: (item) => (
        <Action id={item.id} onDelete={() => deleteProjectMutation({ where: { id: item.id } })} />
      ),
    },
  ]
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ offers, hasMore }] = usePaginatedQuery(getOffers, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={HEADERS}
      hasMore={hasMore}
      data={offers || []}
      onNext={goToNextPage}
      onPrev={goToPreviousPage}
    />
  )
}

const ProjectsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/offers/new">
          <Button>اضافة عرض</Button>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsList />
      </Suspense>
    </div>
  )
}

ProjectsPage.getLayout = (page) => <AdminLayout title={"Projects"}>{page}</AdminLayout>

export default ProjectsPage
