import { Ctx } from "blitz"
import db, { PropertyTypeDeleteArgs } from "db"

type DeletePropertyTypeInput = Pick<PropertyTypeDeleteArgs, "where">

export default async function deletePropertyType({ where }: DeletePropertyTypeInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const propertyType = await db.propertyType.delete({ where })

  return propertyType
}
