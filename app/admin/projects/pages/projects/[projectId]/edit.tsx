import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getProject from "app/admin/projects/queries/getProject"
import updateProject from "app/admin/projects/mutations/updateProject"
import ProjectForm from "app/admin/projects/components/ProjectForm"

export const EditProject = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [project, { setQueryData }] = useQuery(getProject, { where: { id: projectId } })
  const [updateProjectMutation] = useMutation(updateProject)

  return (
    <div>
      <h1>تعديل المشروع {project.name}</h1>

      <ProjectForm
        initialValues={project}
        onSubmit={async (values) => {
          try {
            const updated = await updateProjectMutation({
              where: { id: project.id },
              data: values,
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/projects/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating project " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditProjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject />
      </Suspense>

      <p>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </p>
    </div>
  )
}

EditProjectPage.getLayout = (page) => <AdminLayout title={"Edit Project"}>{page}</AdminLayout>

export default EditProjectPage
