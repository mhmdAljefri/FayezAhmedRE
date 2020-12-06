import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstCarouselArgs } from "db"

type GetCarouselInput = Pick<FindFirstCarouselArgs, "where">

export default async function getCarousel({ where }: GetCarouselInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const carousel = await db.carousel.findFirst({ where })

  if (!carousel) throw new NotFoundError()

  return carousel
}
