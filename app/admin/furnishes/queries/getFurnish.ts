import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstFurnishArgs } from "db"

type GetFurnishInput = Pick<FindFirstFurnishArgs, "where">

export default async function getFurnish({ where }: GetFurnishInput, ctx: Ctx) {
  ctx.session.authorize()

  const furnish = await db.furnish.findFirst({ where })

  if (!furnish) throw new NotFoundError()

  return furnish
}
