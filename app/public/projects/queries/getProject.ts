import { NotFoundError, Ctx } from "blitz"
import db, { Prisma } from "db"

type GetProjectInput = Pick<Prisma.FindFirstProjectArgs, "where">

export default async function getProject({ where }: GetProjectInput, ctx?: Ctx) {
  const userId = ctx?.session?.userId
  const project = await db.project.findFirst({
    where,
    include: {
      country: {
        select: {
          name: true,
        },
      },
      users: true,
      propertyType: true,
      city: true,
      roomsWithPrices: true,
    },
  })

  if (!project) throw new NotFoundError()

  const hasFav = project.users.some(({ id }) => id === userId)
  console.log(
    hasFav,
    userId,
    project.users.map(({ id }) => id)
  )
  delete (project as any).users

  return { ...project, hasFav }
}
