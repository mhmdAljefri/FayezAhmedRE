import db, { Prisma } from "db"
import { Ctx } from "blitz"

type GetProjectsInfiniteInput = Pick<
  Prisma.FindManyOfferArgs,
  "where" | "orderBy" | "skip" | "take" | "select"
>

export default async function getInfiniteOffersI(
  { where, orderBy, take, skip }: GetProjectsInfiniteInput,
  ctx: Ctx
) {
  const userId = ctx?.session?.userId
  let offers = await db.offer.findMany({
    where,
    orderBy,
    take,
    include: {
      users: true,
    },
    skip,
  })

  // dont't pass users to offers list here
  offers = offers.map(({ users, ...offer }) => ({
    ...offer,
    hasFav: users?.some(({ id }) => id === userId),
  })) as any

  const count = await db.offer.count()
  const hasMore = skip! + take! < count
  const nextPage = hasMore ? { take, skip: skip! + take! } : null

  return {
    offers,
    nextPage,
  }
}
