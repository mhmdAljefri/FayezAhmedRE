import { Ctx } from "blitz"
import db, { FurnishCreateArgs } from "db"

type CreateFurnishInput = Pick<FurnishCreateArgs, "data">
export default async function createFurnish({ data }: CreateFurnishInput, ctx: Ctx) {
  ctx.session.authorize()

  const furnish = await db.furnish.create({ data })

  return furnish
}
