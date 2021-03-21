import db, { Prisma } from "db"
import { Ctx } from "blitz"

type GetOffersInput = Pick<
  Prisma.FindManyOfferArgs,
  "where" | "orderBy" | "skip" | "take" | "include"
>

export default async function getOffers(
  { where, include, orderBy, skip = 0, take }: GetOffersInput,
  ctx?: Ctx
) {
  const userId = ctx?.session?.userId
  let offers = await db.offer.findMany({
    where: { ...where, country: { suspend: false } },
    orderBy,
    take,
    include: {
      ...include,
      users: true,
    },
    skip,
  })

  // dont't pass users to offers list here
  offers = offers.map(({ users, ...offer }) => ({
    ...offer,
    hasFav: users.some(({ id }) => id === userId),
  })) as any

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
