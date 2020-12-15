import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const CountriesApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const countries = await db.country.findMany({
    where: {},
    orderBy: {},
    select: { name: true, image: true, isTurkey: true },
  })
  res.status(200).json({
    message: "message",
    countries,
  })
}

export default CountriesApi
