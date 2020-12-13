import { Ctx } from "blitz"
import db, { FurnishCategoryDeleteArgs } from "db"

type DeleteFurnishCategoryInput = Pick<FurnishCategoryDeleteArgs, "where">

export default async function deleteFurnishCategory(
  { where }: DeleteFurnishCategoryInput,
  ctx: Ctx
) {
  ctx.session.authorize(["admin", "superadmin"])

  const furnishCategory = await db.furnishCategory.delete({ where })

  return furnishCategory
}
