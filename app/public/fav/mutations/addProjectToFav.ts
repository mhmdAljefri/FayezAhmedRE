import db from "db"
import { Ctx } from "blitz"

type UpdateProjectInput = number

export default async function addProjectToFav(projectId: UpdateProjectInput, ctx: Ctx) {
  const userId = ctx?.session?.userId
  if (userId) {
    const hasFav = await db.project.findFirst({
      where: {
        id: projectId,
        users: {
          some: { id: userId },
        },
      },
    })

    const project = await db.project.update({
      where: { id: projectId },

      data: {
        users: {
          ...(hasFav
            ? {
                disconnect: {
                  id: userId,
                },
              }
            : {
                connect: {
                  id: userId,
                },
              }),
        },
      },
    })

    return project
  }

  return null
}
