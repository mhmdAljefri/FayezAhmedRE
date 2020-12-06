import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetCitiesInput = Pick<Prisma.FindManyCityArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCities(
  { where, orderBy, skip = 0, take }: GetCitiesInput,
  ctx: Ctx
) {
  ctx.session.authorize("admin")

  const cities = await db.city.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.city.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    cities,
    nextPage,
    hasMore,
    count,
  }
}
