import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetOfferInput = Pick<Prisma.FindFirstOfferArgs, "where">

export default async function getOffer({ where }: GetOfferInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const offer = await db.offer.findFirst({ where })

  if (!offer) throw new NotFoundError()

  return offer
}
