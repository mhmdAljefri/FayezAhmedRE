import { Ctx } from "blitz"
import db, { Prisma } from "db"

export type CreateOfferInputType = {
  data: Omit<Prisma.OfferCreateArgs["data"], "country">
  countryId: number
}

export default async function createOffer({ data, countryId }: CreateOfferInputType, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const projectId = parseInt((data as any).projectId)

  const cityId = parseInt((data as any).cityId)
  delete (data as any).cityId

  delete (data as any).projectId
  if (projectId)
    data.project = {
      connect: { id: projectId },
    }

  const offer = await db.offer.create({
    data: {
      ...data,
      country: {
        connect: {
          id: countryId,
        },
      },
      city: {
        connect: {
          id: cityId,
        },
      },
    },
  })
  return offer
}
