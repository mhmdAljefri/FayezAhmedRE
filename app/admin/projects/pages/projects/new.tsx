import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createProject from "app/admin/projects/mutations/createProject"
import ProjectForm from "app/admin/projects/components/ProjectForm"

const NewProjectPage: BlitzPage = () => {
  const [createProjectMutation] = useMutation(createProject)

  return (
    <div>
      <h1>انشاء مشروع</h1>

      <ProjectForm
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const project = await createProjectMutation({ data: values })
            alert("Success!" + JSON.stringify(project))
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
