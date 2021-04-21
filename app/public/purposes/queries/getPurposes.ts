import db, { FindManyPurposeArgs } from "db"

type GetPurposesInput = Pick<FindManyPurposeArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPurposes({ where, orderBy, skip = 0, take }: GetPurposesInput) {
  const purposes = await db.purpose.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.purpose.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    purposes,
    nextPage,
    hasMore,
    count,
  }
}
