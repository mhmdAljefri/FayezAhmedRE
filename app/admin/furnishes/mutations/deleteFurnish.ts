import { Ctx } from "blitz"
import db, { FurnishDeleteArgs } from "db"

type DeleteFurnishInput = Pick<FurnishDeleteArgs, "where">

export default async function deleteFurnish({ where }: DeleteFurnishInput, ctx: Ctx) {
  ctx.session.$authorize(["admin", "superadmin"])

  const furnish = await db.furnish.delete({ where })

  return furnish
}
