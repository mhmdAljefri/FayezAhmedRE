import { Ctx } from "blitz"
import db, { CarouselCreateArgs } from "db"

type CreateCarouselInput = Pick<CarouselCreateArgs, "data">
export default async function createCarousel({ data }: CreateCarouselInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const carousel = await db.carousel.create({ data })

  return carousel
}
