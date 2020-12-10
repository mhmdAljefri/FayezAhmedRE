import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useMutation, useParam, BlitzPage } from "blitz"
import createExplore from "app/admin/explores/mutations/createExplore"
import ExploreForm from "app/admin/explores/components/ExploreForm"
import { Explore } from "@prisma/client"
import { toast } from "react-toastify"

const NewExplorePage: BlitzPage = () => {
  const router = useRouter()
  const countryId = useParam("countryId", "number") as number
  const type = useParam("type") as Explore["type"]

  const [createExploreMutation] = useMutation(createExplore)

  return (
    <div>
      <h1>اضافة جديد</h1>

      <ExploreForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            await createExploreMutation({ data: { ...data, type }, countryId })
            toast.success("تمت العملية بنجاح!")
            router.push(`/admin/countries/${countryId}/types/${type}/explores/`)
          } catch (error) {
            alert("Error creating explore " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href={`/admin/countries/${countryId}/types/${type}/explores/`}>
          <a>عودة للقائمة</a>
        </Link>
      </p>
    </div>
  )
}

NewExplorePage.getLayout = (page) => <AdminLayout title={"Create New Explore"}>{page}</AdminLayout>

export default NewExplorePage
