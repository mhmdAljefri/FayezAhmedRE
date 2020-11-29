import { Ctx } from "blitz"
import db, { FindManyCarouselArgs } from "db"

type GetCarouselsInput = Pick<FindManyCarouselArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCarousels(
  { where, orderBy, skip = 0, take }: GetCarouselsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const carousels = await db.carousel.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.carousel.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    carousels,
    nextPage,
    hasMore,
    count,
  }
}
