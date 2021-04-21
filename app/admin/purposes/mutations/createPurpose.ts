import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreatePurposeInput = Pick<Prisma.PurposeCreateArgs, "data">
export default async function createPurpose({ data }: CreatePurposeInput, ctx: Ctx) {
  ctx.session.authorize()

  const purpose = await db.purpose.create({ data })

  return purpose
}
