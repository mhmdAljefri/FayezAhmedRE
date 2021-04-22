import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateOfferInput = Pick<Prisma.OfferUpdateArgs, "where" | "data"> & {
  countryId: number
}

export default async function updateOffer({ where, data, countryId }: UpdateOfferInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const projectId = parseInt((data as any).projectId)
  const cityId = parseInt((data as any).cityId)
  const purposeId = parseInt((data as any).purposeId)
  delete (data as any).projectId
  delete (data as any).cityId
  delete (data as any).purposeId

  if (projectId)
    data.project = {
      connect: { id: projectId },
    }
  // todo fide removed room and delete it from database
  // todo fide new room and create it with relation

  const offer = await db.offer.update({
    where,
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
