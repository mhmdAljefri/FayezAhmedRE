import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteOfferInput = Pick<Prisma.OfferDeleteArgs, "where">

export default async function deleteOffer({ where }: DeleteOfferInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const offer = await db.offer.delete({ where })

  return offer
}
