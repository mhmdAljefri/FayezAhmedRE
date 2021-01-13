import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db"

const ProjectsApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { countryId } = req.body
  const projects = await db.project.findMany({
    where: {
      countryId: parseInt(countryId) || undefined,
    },
    orderBy: {},
  })
  res.status(200).json({
    message: "message",
    projects,
  })
}

export default ProjectsApi
