import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const ContactRequestApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const data = JSON.parse(req.body)
  try {
    await db.request.create({
      data: {
        type: data.type,
        data,
      },
    })
    console.log({ data })
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(422).json({
      message: "failed",
    })
  }
}

export default ContactRequestApi
