import { Ctx } from "blitz"
import db, { FurnishCategoryCreateArgs } from "db"

type CreateFurnishCategoryInput = Pick<FurnishCategoryCreateArgs, "data">
export default async function createFurnishCategory(
  { data }: CreateFurnishCategoryInput,
  ctx: Ctx
) {
  ctx.session.authorize("admin")

  const furnishCategory = await db.furnishCategory.create({ data })

  return furnishCategory
}
