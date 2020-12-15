import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const FurnishApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { furnishCategoryId } = req.body
  const furnish = await db.furnish.findMany({
    where: {
      furnishCategoryId: parseInt(furnishCategoryId),
    },
    orderBy: {},
  })
  res.status(200).json({
    message: "message",
    furnish,
  })
}

export default FurnishApi
