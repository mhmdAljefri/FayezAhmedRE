import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteExploreInput = Pick<Prisma.ExploreDeleteArgs, "where">

export default async function deleteExplore({ where }: DeleteExploreInput, ctx: Ctx) {
  ctx.session.$authorize()

  const explore = await db.explore.delete({ where })

  return explore
}
