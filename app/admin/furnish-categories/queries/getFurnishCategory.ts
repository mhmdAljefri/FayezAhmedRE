import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstFurnishCategoryArgs } from "db"

type GetFurnishCategoryInput = Pick<FindFirstFurnishCategoryArgs, "where">

export default async function getFurnishCategory({ where }: GetFurnishCategoryInput, ctx: Ctx) {
  ctx.session.$authorize(["admin", "superadmin"])

  const furnishCategory = await db.furnishCategory.findFirst({ where })

  if (!furnishCategory) throw new NotFoundError()

  return furnishCategory
}
