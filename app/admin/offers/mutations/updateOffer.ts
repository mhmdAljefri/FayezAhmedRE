import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateOfferInput = Pick<Prisma.OfferUpdateArgs, "where" | "data"> & {
  countryId: number
}

export default async function updateOffer({ where, data, countryId }: UpdateOfferInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const projectId = parseInt((data as any).projectId)
  delete (data as any).projectId
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
    },
  })

  return offer
}
