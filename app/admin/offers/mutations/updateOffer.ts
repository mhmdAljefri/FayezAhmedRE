import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateOfferInput = Pick<Prisma.OfferUpdateArgs, "where" | "data"> & {
  projectId: number
}

export default async function updateOffer({ where, data, projectId }: UpdateOfferInput, ctx: Ctx) {
  ctx.session.authorize("admin")
  const country = await db.country.findFirst({
    where: {
      projects: { some: { id: projectId } },
    },
  })

  const offer = await db.offer.update({
    where,
    data: {
      ...data,
      country: {
        connect: {
          id: country?.id,
        },
      },
      project: { connect: { id: projectId } },
    },
  })

  return offer
}
