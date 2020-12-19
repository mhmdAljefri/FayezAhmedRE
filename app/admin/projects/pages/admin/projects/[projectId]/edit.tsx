import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getProject from "app/admin/projects/queries/getProject"
import updateProject from "app/admin/projects/mutations/updateProject"
import ProjectForm from "app/admin/projects/components/ProjectForm"
import { toast } from "react-toastify"

export const EditProject = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [project] = useQuery(getProject, { where: { id: projectId } })
  const [updateProjectMutation] = useMutation(updateProject)

  const initialValues = {
    ...project,
    countryId: project.countryId.toString(),
    cityId: project.cityId?.toString(),
    propertyTypeId: project.propertyTypeId?.toString(),
  }

  return (
    <div>
      <h1>تعديل المشروع {project.name}</h1>

      <ProjectForm
        initialValues={initialValues}
        onSubmit={async (values) => {
          const countryId = parseInt(values.countryId)
          const roomsWithPrices = values.roomsWithPrices
          delete values.id
          delete values.countryId
          delete values.roomsWithPrices

          try {
            await updateProjectMutation({
              where: { id: project.id },
              data: values,
              countryId,
              roomsWithPrices,
            })
            toast.success("تم التعديل بنجاح!")
            router.push(`/admin/projects/`)
          } catch (error) {
            console.log(error)
            toast.error("فشل في عملية التعديل!")
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
    </div>
  )
}

EditProjectPage.getLayout = (page) => <AdminLayout title={"Edit Project"}>{page}</AdminLayout>

export default EditProjectPage
