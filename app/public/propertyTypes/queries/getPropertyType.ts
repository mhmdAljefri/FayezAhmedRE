import { NotFoundError } from "blitz"
import db, { FindFirstPropertyTypeArgs } from "db"

type GetPropertyTypeInput = Pick<FindFirstPropertyTypeArgs, "where">

export default async function getPropertyType({ where }: GetPropertyTypeInput) {
  const propertyType = await db.propertyType.findFirst({ where })

  if (!propertyType) throw new NotFoundError()

  return propertyType
}
