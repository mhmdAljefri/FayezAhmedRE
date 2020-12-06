import { Ctx } from "blitz"
import db, { FurnishUpdateArgs } from "db"

type UpdateFurnishInput = Pick<FurnishUpdateArgs, "where" | "data">

export default async function updateFurnish({ where, data }: UpdateFurnishInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const furnish = await db.furnish.update({ where, data })

  return furnish
}
