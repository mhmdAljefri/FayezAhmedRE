import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetCarouselInput = Pick<Prisma.FindFirstCarouselVideoArgs, "where">

export default async function getCarouselVideo({ where }: GetCarouselInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const carouselVideo = await db.carouselVideo.findFirst({ where })

  return carouselVideo
}
