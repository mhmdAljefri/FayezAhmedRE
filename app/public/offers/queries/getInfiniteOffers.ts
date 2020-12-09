import db, { Prisma } from "db"

type GetProjectsInfiniteInput = Pick<
  Prisma.FindManyOfferArgs,
  "where" | "orderBy" | "skip" | "take" | "select"
>

export default async function getInfiniteOffersI({
  where,
  orderBy,
  take,
  skip,
}: GetProjectsInfiniteInput) {
  const offers = await db.offer.findMany({
    where,
    orderBy,
    take,
    skip,
  })
  const count = await db.offer.count()
  const hasMore = skip! + take! < count
  const nextPage = hasMore ? { take, skip: skip! + take! } : null
  return {
    offers,
    nextPage,
  }
}
