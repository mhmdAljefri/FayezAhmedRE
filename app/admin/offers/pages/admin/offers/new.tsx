import AdminLayout from "app/layouts/AdminLayout"
import { Link, useMutation, BlitzPage, useRouter } from "blitz"
import createProject from "app/admin/projects/mutations/createProject"
import ProjectForm from "app/admin/projects/components/ProjectForm"

const NewProjectPage: BlitzPage = () => {
  const [createProjectMutation] = useMutation(createProject)
  const router = useRouter()
  return (
    <div>
      <h1>انشاء عرض</h1>

      <ProjectForm
        initialValues={{}}
        onSubmit={async (values) => {
          const countryId = parseInt(values.countryId)
          const roomsWithPrices = values.roomsWithPrices
          delete values.countryId
          delete values.roomsWithPrices

          try {
            await createProjectMutation({
              data: values,
              countryId,
              roomsWithPrices,
            })
            router.push("/admin/projects")
          } catch (error) {
            alert("Error creating project " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/projects">
          <a>المشاريع</a>
        </Link>
      </p>
    </div>
  )
}

NewProjectPage.getLayout = (page) => <AdminLayout title={"Create New Project"}>{page}</AdminLayout>

export default NewProjectPage
