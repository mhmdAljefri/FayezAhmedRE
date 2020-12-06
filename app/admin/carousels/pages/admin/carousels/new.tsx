import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createCarousel from "app/admin/carousels/mutations/createCarousel"
import CarouselForm from "app/admin/carousels/components/CarouselForm"
import { toast } from "react-toastify"

const NewCarouselPage: BlitzPage = () => {
  const router = useRouter()
  const [createCarouselMutation] = useMutation(createCarousel)

  return (
    <div>
      <CarouselForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            await createCarouselMutation({ data })
            toast.success("تمت العملية الاضافة بنجاح")
            router.push(`/admin/carousels/`)
          } catch (error) {
            toast.error("فشل في  عملية الاضافة " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

NewCarouselPage.getLayout = (page) => (
  <AdminLayout title={"Create New Carousel"}>{page}</AdminLayout>
)

export default NewCarouselPage
