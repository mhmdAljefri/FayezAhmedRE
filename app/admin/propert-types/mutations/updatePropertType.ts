import { Ctx } from "blitz"
import db, { PropertyTypeUpdateArgs } from "db"

type UpdatePropertyTypeInput = Pick<PropertyTypeUpdateArgs, "where" | "data">

export default async function updatePropertyType(
  { where, data }: UpdatePropertyTypeInput,
  ctx: Ctx
) {
  ctx.session.authorize("admin")

  const propertyType = await db.propertyType.update({ where, data })

  return propertyType
}
