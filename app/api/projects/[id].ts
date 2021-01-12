import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const ProjectApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { id } = req.body
  const project = await db.project.findFirst({
    where: {
      id: id,
    },
  })
  res.status(200).json({
    message: "message",
    project,
  })
}

export default ProjectApi
