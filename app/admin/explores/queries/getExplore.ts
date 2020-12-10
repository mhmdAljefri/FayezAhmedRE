import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetExploreInput = Pick<Prisma.FindFirstExploreArgs, "where">

export default async function getExplore({ where }: GetExploreInput, ctx: Ctx) {
  ctx.session.authorize()

  const explore = await db.explore.findFirst({ where })

  if (!explore) throw new NotFoundError()

  return explore
}
