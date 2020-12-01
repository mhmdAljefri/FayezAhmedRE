import { NotFoundError } from "blitz"
import db, { FindFirstProjectArgs } from "db"

type GetProjectInput = Pick<FindFirstProjectArgs, "where">

export default async function getProject({ where }: GetProjectInput) {
  const project = await db.project.findFirst({
    where,
    include: {
      country: {
        select: {
          name: true,
        },
      },
      roomsWithPrices: true,
    },
  })

  if (!project) throw new NotFoundError()

  return project
}
