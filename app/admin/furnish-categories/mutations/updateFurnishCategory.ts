import { Ctx } from "blitz"
import db, { FurnishCategoryUpdateArgs } from "db"

type UpdateFurnishCategoryInput = Pick<FurnishCategoryUpdateArgs, "where" | "data">

export default async function updateFurnishCategory(
  { where, data }: UpdateFurnishCategoryInput,
  ctx: Ctx
) {
  ctx.session.authorize(["admin", "superadmin"])

  const furnishCategory = await db.furnishCategory.update({ where, data })

  return furnishCategory
}
