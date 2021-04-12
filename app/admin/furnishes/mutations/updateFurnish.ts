import { Ctx } from "blitz"
import db, { FurnishUpdateArgs } from "db"

type UpdateFurnishInput = Pick<FurnishUpdateArgs, "where" | "data"> & {
  furnishCategoryId: number
}

export default async function updateFurnish(
  { where, data, furnishCategoryId }: UpdateFurnishInput,
  ctx: Ctx
) {
  ctx.session.$authorize(["admin", "superadmin"])

  const furnish = await db.furnish.update({
    where,
    data: { ...data, furnishCategory: { connect: { id: furnishCategoryId } } },
  })

  return furnish
}
