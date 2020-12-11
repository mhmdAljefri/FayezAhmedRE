import { Ctx } from "blitz"
import db, { Prisma } from "db"
import { any } from "zod"

export type CreateOfferInputType = {
  data: Omit<Prisma.OfferCreateArgs["data"], "country">
  countryId: number
}

export default async function createOffer({ data, countryId }: CreateOfferInputType, ctx: Ctx) {
  ctx.session.authorize("admin")

  const projectId = parseInt((data as any).projectId)
  delete (data as any).projectId
  if (projectId)
    data.project = {
      connect: { id: projectId },
    }

  try {
    const offer = await db.offer.create({
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
  } catch (error) {
    console.error(error)
  }
}
