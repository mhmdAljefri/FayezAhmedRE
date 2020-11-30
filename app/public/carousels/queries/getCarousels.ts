import db, { FindManyCarouselArgs } from "db"

type GetCarouselsInput = Pick<FindManyCarouselArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCarousels({ where, orderBy, skip = 0, take }: GetCarouselsInput) {
  const carousels = await db.carousel.findMany({
    where,
    orderBy,
    take,
    select: {
      title: true,
      text: true,
      image: true,
    },
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
