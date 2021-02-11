import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import { uploadFile } from "app/utils/aws"

const ObjectsUploadAPI = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { file } = JSON.parse(req.body)

  // make file form string
  const Body = Buffer.from(file.data.replace(/^(data:image|data:video)\/\w+;base64,/, ""), "base64")

  try {
    const Key = `${process.env.NEXT_PUBLIC_AWS_FOLDER}/${file.filename}`
    const params = {
      Key,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: file.content_type,
      Body,
    }
    const data = await uploadFile(params)

    res.status(200).json({ data: { ...data, url: Key } })
  } catch (error) {
    res.status(422).json({
      error,
    })
  }
}

export default ObjectsUploadAPI

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "17mb",
    },
  },
}
