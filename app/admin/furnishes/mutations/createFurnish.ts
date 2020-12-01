import { Ctx } from "blitz"
import db, { FurnishCreateArgs } from "db"

type CreateFurnishInput = Pick<FurnishCreateArgs, "data">
export default async function createFurnish({ data }: CreateFurnishInput, ctx: Ctx) {
  ctx.session.authorize()

  // furnishCategory: {
  //   +     create?: FurnishCategoryCreateWithoutFurnishesInput,
  //   +     connect?:

  console.log({ data })
  const furnish = await db.furnish.create({
    data: {
      ...data,
      furnishCategory: {
        connect: {
          id: parseInt(`${data.furnishCategory.connect?.id}`),
        },
      },
    },
  })

  return furnish
}
