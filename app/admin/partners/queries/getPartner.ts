import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstPartnerArgs } from "db"

type GetPartnerInput = Pick<FindFirstPartnerArgs, "where">

export default async function getPartner({ where }: GetPartnerInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const partner = await db.partner.findFirst({ where })

  if (!partner) throw new NotFoundError()

  return partner
}
