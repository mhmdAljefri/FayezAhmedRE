import { Ctx } from "blitz"
import db, { PartnerDeleteArgs } from "db"

type DeletePartnerInput = Pick<PartnerDeleteArgs, "where">

export default async function deletePartner({ where }: DeletePartnerInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const partner = await db.partner.delete({ where })

  return partner
}
