import { Ctx } from "blitz"
import db, { CarouselUpdateArgs } from "db"

type UpdateCarouselInput = Pick<CarouselUpdateArgs, "where" | "data">

export default async function updateCarousel({ where, data }: UpdateCarouselInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const carousel = await db.carousel.update({ where, data })

  return carousel
}
