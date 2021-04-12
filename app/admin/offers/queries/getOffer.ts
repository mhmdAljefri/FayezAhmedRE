import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetOfferInput = Pick<Prisma.FindFirstOfferArgs, "where">

export default async function getOffer({ where }: GetOfferInput, ctx: Ctx) {
  ctx.session.$authorize(["admin", "superadmin"])

  const offer = await db.offer.findFirst({ where, include: { country: true } })

  if (!offer) throw new NotFoundError()

  return offer
}
