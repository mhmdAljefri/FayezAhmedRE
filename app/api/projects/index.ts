import getProjects from "app/public/projects/queries/getProjects"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const ProjectsApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { countryId } = req.body
  const projects = await getProjects({
    where: {
      countryId: parseInt(countryId) || undefined,
    },
  })

  res.status(200).json({
    message: "message",
    projects,
  })
}

export default ProjectsApi
