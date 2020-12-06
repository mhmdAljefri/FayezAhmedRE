import { Ctx } from "blitz"
import db, { CarouselDeleteArgs } from "db"

type DeleteCarouselInput = Pick<CarouselDeleteArgs, "where">

export default async function deleteCarousel({ where }: DeleteCarouselInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const carousel = await db.carousel.delete({ where })

  return carousel
}
