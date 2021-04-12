import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetExploresInput = Pick<Prisma.FindManyExploreArgs, "where" | "orderBy" | "skip" | "take">

export default async function getExplores(
  { where, orderBy, skip = 0, take }: GetExploresInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const explores = await db.explore.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.explore.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    explores,
    nextPage,
    hasMore,
    count,
  }
}
