import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateOfferInput = Pick<Prisma.OfferCreateArgs, "data"> & {
  projectId: number
}
export default async function createOffer({ data, projectId }: CreateOfferInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const country = await db.country.findFirst({
    where: {
      projects: { some: { id: projectId } },
    },
  })

  const offer = await db.offer.create({
    data: {
      ...data,
      project: {
        connect: { id: projectId },
      },
      country: {
        connect: {
          id: country?.id,
        },
      },
    },
  })

  return offer
}
