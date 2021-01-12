import getPartners from "app/public/partners/queries/getPartners"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const PartnersApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { partners } = await getPartners({})

  res.status(200).json({
    message: "message",
    partners,
  })
}

export default PartnersApi
