import { Ctx } from "blitz"
import db, { PartnerCreateArgs } from "db"

type CreatePartnerInput = Pick<PartnerCreateArgs, "data">
export default async function createPartner({ data }: CreatePartnerInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const partner = await db.partner.create({ data })

  return partner
}
