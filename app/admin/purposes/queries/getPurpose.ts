import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetPurposeInput = Pick<Prisma.FindFirstPurposeArgs, "where">

export default async function getPurpose({ where }: GetPurposeInput, ctx: Ctx) {
  ctx.session.authorize()

  const purpose = await db.purpose.findFirst({ where })

  if (!purpose) throw new NotFoundError()

  return purpose
}
