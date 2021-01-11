import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateCarouselInput = Pick<Prisma.CarouselVideoCreateArgs, "data">
export default async function createCarouselVideo({ data }: CreateCarouselInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const carouselVideo = await db.carouselVideo.create({
    data: { ...data, isActive: `${data.isActive}` === "true" },
  })

  return carouselVideo
}
