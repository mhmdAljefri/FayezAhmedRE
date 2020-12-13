import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdatePropertyTypeInput = Pick<Prisma.PropertyTypeUpdateArgs, "where" | "data">

export default async function updatePropertyType(
  { where, data }: UpdatePropertyTypeInput,
  ctx: Ctx
) {
  ctx.session.authorize(["admin", "superadmin"])

  delete (data as any).id

  const propertyType = await db.propertyType.update({ where, data })

  return propertyType
}
