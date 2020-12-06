import db, { FindManyFurnishArgs } from "db"

type GetFurnishesInput = Pick<FindManyFurnishArgs, "where" | "orderBy" | "skip" | "take">

export default async function getFurnishes({ where, orderBy, skip = 0, take }: GetFurnishesInput) {
  const furnishes = await db.furnish.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.furnish.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    furnishes,
    nextPage,
    hasMore,
    count,
  }
}
