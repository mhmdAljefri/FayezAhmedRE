import getProjects from "app/public/projects/queries/getProjects"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const ProjectsApi = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { projects } = await getProjects({
    include: {
      country: {
        select: {
          name: true,
          isTurkey: true,
          id: true,
        },
      },
      city: true,
    },
    take: 6,
    where: {
      isHousingComplex: true,
    },
  })

  res.status(200).json({
    message: "message",
    projects,
  })
}

export default ProjectsApi
