import { Ctx } from "blitz"
import db, { Prisma } from "db"

export type CreateOfferInputType = {
  data: Omit<Prisma.OfferCreateArgs["data"], "country">
  countryId: number
}

export default async function createOffer({ data, countryId }: CreateOfferInputType, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const projectId = parseInt((data as any).projectId)
  delete (data as any).projectId

  const cityId = parseInt((data as any).cityId)
  delete (data as any).cityId

  const purposeId = parseInt((data as any).purposeId)
  delete (data as any).purposeId

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
      purpose: {
        connect: {
          id: purposeId,
        },
      },
    },
  })
  return offer
}
