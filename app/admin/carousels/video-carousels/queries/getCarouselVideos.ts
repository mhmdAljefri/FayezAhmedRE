import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetCarouselsInput = Pick<
  Prisma.FindManyCarouselVideoArgs,
  "where" | "orderBy" | "skip" | "take"
>

export default async function getCarouselVideos(
  { where, orderBy, skip = 0, take }: GetCarouselsInput,
  ctx: Ctx
) {
  ctx.session.$authorize(["admin", "superadmin"])

  const carouselVideos = await db.carouselVideo.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.carouselVideo.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    carouselVideos,
    nextPage,
    hasMore,
    count,
  }
}
