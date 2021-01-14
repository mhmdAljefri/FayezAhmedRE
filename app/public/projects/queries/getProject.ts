import { NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetProjectInput = Pick<Prisma.FindFirstProjectArgs, "where">

export default async function getProject({ where }: GetProjectInput) {
  const project = await db.project.findFirst({
    where,
    include: {
      country: {
        select: {
          name: true,
        },
      },
      propertyType: true,
      city: true,
      roomsWithPrices: true,
    },
  })

  if (!project) throw new NotFoundError()

  return project
}
