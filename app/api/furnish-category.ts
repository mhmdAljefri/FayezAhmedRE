import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const FurnishCategoriesApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const furnishCategories = await db.furnishCategory.findMany({
    where: {},
    orderBy: {},
    select: { name: true, image: true, id: true },
  })
  res.status(200).json({
    message: "message",
    furnishCategories,
  })
}

export default FurnishCategoriesApi
