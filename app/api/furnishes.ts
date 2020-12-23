import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const FurnishApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { furnishCategoryId } = req.body?.params || {}
  const furnishCategoryIdFilter = furnishCategoryId ? parseInt(furnishCategoryId) : undefined
  console.log({ furnishCategoryIdFilter }, req.body)
  const furnish = await db.furnish.findMany({
    where: {
      furnishCategoryId: furnishCategoryIdFilter,
    },
    orderBy: {},
  })
  res.status(200).json({
    message: "message",
    furnish,
  })
}

export default FurnishApi
