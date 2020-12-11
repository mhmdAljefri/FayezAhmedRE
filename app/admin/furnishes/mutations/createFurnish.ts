import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateFurnishInput = Pick<Prisma.FurnishCreateArgs, "data"> & {
  furnishCategoryId: number
}
export default async function createFurnish(
  { data, furnishCategoryId }: CreateFurnishInput,
  ctx: Ctx
) {
  ctx.session.authorize("admin")

  // furnishCategory: {
  //   +     create?: FurnishCategoryCreateWithoutFurnishesInput,
  //   +     connect?:

  const furnish = await db.furnish.create({
    data: {
      ...data,
      furnishCategory: {
        connect: {
          id: furnishCategoryId,
        },
      },
    },
  })

  return furnish
}
