import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeletePurposeInput = Pick<Prisma.PurposeDeleteArgs, "where">

export default async function deletePurpose({ where }: DeletePurposeInput, ctx: Ctx) {
  ctx.session.authorize()

  const purpose = await db.purpose.delete({ where })

  return purpose
}
