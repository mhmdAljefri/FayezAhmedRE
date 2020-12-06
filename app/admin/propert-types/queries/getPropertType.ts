import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstPropertyTypeArgs } from "db"

type GetPropertyTypeInput = Pick<FindFirstPropertyTypeArgs, "where">

export default async function getPropertyType({ where }: GetPropertyTypeInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const propertyType = await db.propertyType.findFirst({ where })

  if (!propertyType) throw new NotFoundError()

  return propertyType
}
