import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation, useQuery } from "blitz"
import getCarousels from "app/admin/carousels/queries/getCarousels"
import getCarouselVideo from "app/admin/carousels/video-carousels/queries/getCarouselVideo"
import DynamicTable from "app/components/Tables/DynamicTable"
import Action from "app/admin/components/Action"
import { Image } from "theme-ui"
import deleteCarousel from "app/admin/carousels/mutations/deleteCarousel"
import VideoCarouselForm from "app/admin/carousels/video-carousels/components/VideoCarouselForm"
import createCarouselVideo from "app/admin/carousels/video-carousels/mutations/createCarouselVideo"
import updateCarouselVideo from "app/admin/carousels/video-carousels/mutations/updateCarouselVideo"
import { toast } from "react-toastify"

const ITEMS_PER_PAGE = 100

export const CarouselsList = () => {
  const router = useRouter()
  const [deleteCarouselMutation] = useMutation(deleteCarousel)
  const [createCarouselVideoMutation] = useMutation(createCarouselVideo)
  const [updateCarouselVideoMutation] = useMutation(updateCarouselVideo)

  const page = Number(router.query.page) || 0
  const [{ carousels, hasMore }, { refetch }] = usePaginatedQuery(getCarousels, {
    orderBy: { id: "asc" },
    where: {},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [carouselVideo] = useQuery(getCarouselVideo, { where: {} })

  const handleDelete = (id) => deleteCarouselMutation({ where: { id } }).then(() => refetch())
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <VideoCarouselForm
        initialValues={carouselVideo || {}}
        onSubmit={async (data) => {
          try {
            if (carouselVideo) {
              await updateCarouselVideoMutation({
                where: { id: carouselVideo.id },
                data: { videoUlr: data.videoUlr, isActive: data.isActive },
              })
            } else {
              await createCarouselVideoMutation({ data })
            }

            toast.success("تمت العملية الاضافة بنجاح")
          } catch (error) {
            toast.error("فشل في  عملية الاضافة " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <DynamicTable
        headers={[
          { name: "", key: "id" },
          { name: "", render: ({ image }) => <Image sx={{ width: 120 }} src={image} /> },
          { name: "", render: ({ id }) => <Action onDelete={() => handleDelete(id)} id={id} /> },
        ]}
        onPrev={goToPreviousPage}
        onNext={goToNextPage}
        data={carousels}
        hasMore={hasMore}
      />
    </>
  )
}

const CarouselsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/carousels/new">
          <a>اضافة شريحة للمعرض</a>
        </Link>
      </p>

      <Suspense fallback={<div>تحميل...</div>}>
        <CarouselsList />
      </Suspense>
    </div>
  )
}

CarouselsPage.getLayout = (page) => <AdminLayout title={"Carousels"}>{page}</AdminLayout>

export default CarouselsPage
