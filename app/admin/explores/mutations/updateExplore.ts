import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateExploreInput = {
  where: Prisma.ExploreUpdateArgs["where"]
  data: Omit<Prisma.ExploreUpdateArgs["data"], "country">
  countryId: number
}

export default async function updateExplore(
  { where, data, countryId }: UpdateExploreInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  // Don't allow updating
  delete (data as any).country
  delete (data as any).id

  const explore = await db.explore.update({ where, data })

  return explore
}
