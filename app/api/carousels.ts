import getCarouselVideo from "app/public/carouselvideos/queries/getCarouselvideo"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const CarouselsApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const carouselVideo = await getCarouselVideo({})
  const carousels = await db.carousel.findMany({
    where: {},
    orderBy: {},
    select: { image: true, id: true },
  })

  res.status(200).json({
    message: "message",
    carousels,
    carouselVideo,
  })
}

export default CarouselsApi
