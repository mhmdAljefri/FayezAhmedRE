import { Ctx } from "blitz"
import db, { PropertyTypeCreateArgs } from "db"

type CreatePropertyTypeInput = Pick<PropertyTypeCreateArgs, "data">
export default async function createPropertyType({ data }: CreatePropertyTypeInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const propertyType = await db.propertyType.create({ data })

  return propertyType
}
