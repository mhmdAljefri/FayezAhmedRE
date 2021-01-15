import getOprationCompanyPages from "app/public/oprationCompanyPages/queries/getOprationCompanyPages"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const FurnishCategoriesApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { countryId } = req.body

  const { oprationCompanyPages } = await getOprationCompanyPages({
    where: {
      countryId: parseInt(countryId) || undefined,
    },
  })

  res.status(200).json({
    message: "message",
    oprationCompanyPages,
  })
}

export default FurnishCategoriesApi
