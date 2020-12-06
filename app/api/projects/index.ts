import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const ProjectsApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { counryId } = req.body
  const projects = await db.project.findMany({
    where: {
      country: {
        id: counryId,
      },
    },
    orderBy: {},
  })
  res.status(200).json({
    message: "message",
    projects,
  })
}

export default ProjectsApi
