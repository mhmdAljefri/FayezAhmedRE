import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getCarousel from "app/admin/carousels/queries/getCarousel"
import updateCarousel from "app/admin/carousels/mutations/updateCarousel"
import CarouselForm from "app/admin/carousels/components/CarouselForm"
import { toast } from "react-toastify"

export const EditCarousel = () => {
  const router = useRouter()
  const carouselId = useParam("carouselId", "number")
  const [carousel, { setQueryData }] = useQuery(getCarousel, { where: { id: carouselId } })
  const [updateCarouselMutation] = useMutation(updateCarousel)

  return (
    <div>
      <h1>تعديل على التفاصيل {carousel.id}</h1>

      <CarouselForm
        initialValues={carousel}
        onSubmit={async (data) => {
          delete (data as any).id
          delete (data as any).position

          try {
            const updated = await updateCarouselMutation({
              where: { id: carousel.id },
              data,
            })
            await setQueryData(updated)
            toast.success("تمت عملية التعديل بنجاح")
            router.push(`/admin/carousels/`)
          } catch (error) {
            toast.error("فشل في عملية التعديل " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditCarouselPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCarousel />
      </Suspense>

      <p>
        <Link href="/carousels">
          <a>Carousels</a>
        </Link>
      </p>
    </div>
  )
}

EditCarouselPage.getLayout = (page) => <AdminLayout title={"Edit Carousel"}>{page}</AdminLayout>

export default EditCarouselPage
