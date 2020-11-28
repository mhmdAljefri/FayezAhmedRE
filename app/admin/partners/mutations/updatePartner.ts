import { Ctx } from "blitz"
import db, { PartnerUpdateArgs } from "db"

type UpdatePartnerInput = Pick<PartnerUpdateArgs, "where" | "data">

export default async function updatePartner({ where, data }: UpdatePartnerInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const partner = await db.partner.update({ where, data })

  return partner
}
