import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetProjectInput = Pick<Prisma.FindFirstProjectArgs, "where">

export default async function getProject({ where }: GetProjectInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const project = await db.project.findFirst({
    where,
    include: {
      country: true,
      roomsWithPrices: true,
    },
  })

  if (!project) throw new NotFoundError()

  return project
}
