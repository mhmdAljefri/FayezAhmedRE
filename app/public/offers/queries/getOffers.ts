import db, { Prisma } from "db"

type GetOffersInput = Pick<
  Prisma.FindManyOfferArgs,
  "where" | "orderBy" | "skip" | "take" | "select"
>

export default async function getOffers({
  where,
  select,
  orderBy,
  skip = 0,
  take,
}: GetOffersInput) {
  const offers = await db.offer.findMany({
    where,
    orderBy,
    take,
    select,
    skip,
  })

  const count = await db.offer.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    offers,
    nextPage,
    hasMore,
    count,
  }
}
