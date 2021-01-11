import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateCarouselInput = Pick<Prisma.CarouselVideoUpdateArgs, "where" | "data">

export default async function updateCarouselVideo({ where, data }: UpdateCarouselInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const carouselVideo = await db.carouselVideo.update({
    where,
    data: { ...data, isActive: `${data.isActive}` === "true" },
  })

  return carouselVideo
}
