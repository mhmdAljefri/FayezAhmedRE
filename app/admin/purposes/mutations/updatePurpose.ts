import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdatePurposeInput = Pick<Prisma.PurposeUpdateArgs, "where" | "data">

export default async function updatePurpose({ where, data }: UpdatePurposeInput, ctx: Ctx) {
  ctx.session.authorize()

  const purpose = await db.purpose.update({ where, data })

  return purpose
}
