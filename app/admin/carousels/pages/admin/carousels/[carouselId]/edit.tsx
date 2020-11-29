import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getCarousel from "app/admin/carousels/queries/getCarousel"
import updateCarousel from "app/admin/carousels/mutations/updateCarousel"
import CarouselForm from "app/admin/carousels/components/CarouselForm"

export const EditCarousel = () => {
  const router = useRouter()
  const carouselId = useParam("carouselId", "number")
  const [carousel, { setQueryData }] = useQuery(getCarousel, { where: { id: carouselId } })
  const [updateCarouselMutation] = useMutation(updateCarousel)

  return (
    <div>
      <h1>Edit Carousel {carousel.id}</h1>
      <pre>{JSON.stringify(carousel)}</pre>

      <CarouselForm
        initialValues={carousel}
        onSubmit={async (data) => {
          try {
            const updated = await updateCarouselMutation({
              where: { id: carousel.id },
              data,
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/admin/carousels/`)
          } catch (error) {
            console.log(error)
            alert("Error creating carousel " + JSON.stringify(error, null, 2))
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

EditCarouselPage.getLayout = (page) => <Layout title={"Edit Carousel"}>{page}</Layout>

export default EditCarouselPage
