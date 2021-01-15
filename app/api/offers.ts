import getOffers from "app/public/offers/queries/getOffers"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const CarouselsApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { offers } = await getOffers({})

  res.status(200).json({
    message: "message",
    offers,
  })
}

export default CarouselsApi
