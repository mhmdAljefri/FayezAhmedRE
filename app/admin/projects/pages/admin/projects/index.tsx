import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import getProjects from "app/admin/projects/queries/getProjects"
import deleteProject from "app/admin/projects/mutations/deleteProject"
import DynamicTable from "app/components/Tables/DynamicTable"
import Action from "app/admin/components/Action"
import { Button } from "theme-ui"

const ITEMS_PER_PAGE = 100

export const ProjectsList = () => {
  const [deleteProjectMutation] = useMutation(deleteProject)

  const HEADERS = [
    { name: "", key: "id" },
    { name: "اسم المشروع", key: "name" },
    {
      name: "",
      render: (item) => <Action id={item.id} onDelete={deleteProjectMutation} />,
    },
  ]
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
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
      data={projects || []}
      onNext={goToNextPage}
      onPrev={goToPreviousPage}
    />
  )
}

const ProjectsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/projects/new">
          <Button>اضافة مشروع</Button>
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
