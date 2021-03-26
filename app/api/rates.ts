import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import getCurrencyRate from "app/utils/getCurrencyRate"

const TwitsAPI = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const rates = await getCurrencyRate()

  res.status(200).json({
    ...rates,
  })
}

export default TwitsAPI
