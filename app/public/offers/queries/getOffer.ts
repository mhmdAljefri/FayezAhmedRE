import { NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetProjectInput = Pick<Prisma.FindFirstOfferArgs, "where">

export default async function getOffer({ where }: GetProjectInput) {
  const offer = await db.offer.findFirst({
    where,
    include: {
      project: {
        include: {
          roomsWithPrices: true,
          propertyType: true,
        },
      },
      country: true,
    },
  })

  if (!offer) throw new NotFoundError()

  return offer
}
