import getProject from "app/public/projects/queries/getProject"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const ProjectApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { id } = req.body
  const project = await getProject({
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
