import db, { Prisma } from "db"

type GetCarouselVideoInput = Pick<Prisma.FindFirstCarouselVideoArgs, "where">

export default async function getCarouselVideo({ where }: GetCarouselVideoInput) {
  const carouselVideo = await db.carouselVideo.findFirst({ where })

  return carouselVideo
}
