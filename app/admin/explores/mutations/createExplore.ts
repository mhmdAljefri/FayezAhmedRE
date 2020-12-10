import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateExploreInput = {
  data: Omit<Prisma.ExploreCreateArgs["data"], "country">
  countryId: number
}
export default async function createExplore({ data, countryId }: CreateExploreInput, ctx: Ctx) {
  ctx.session.authorize()

  const explore = await db.explore.create({
    data: { ...data, country: { connect: { id: countryId } } },
  })

  return explore
}
