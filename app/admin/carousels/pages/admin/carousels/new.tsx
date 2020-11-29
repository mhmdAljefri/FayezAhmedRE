import AdminLayout from "app/layouts/AdminLayout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createCarousel from "app/admin/carousels/mutations/createCarousel"
import CarouselForm from "app/admin/carousels/components/CarouselForm"

const NewCarouselPage: BlitzPage = () => {
  const router = useRouter()
  const [createCarouselMutation] = useMutation(createCarousel)

  return (
    <div>
      <CarouselForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            const carousel = await createCarouselMutation({ data })
            alert("Success!" + JSON.stringify(carousel))
            router.push(`/admin/carousels/`)
          } catch (error) {
            alert("Error creating carousel " + JSON.stringify(error, null, 2))
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
