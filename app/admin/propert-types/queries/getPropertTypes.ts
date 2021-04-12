import { Ctx } from "blitz"
import db, { FindManyPropertyTypeArgs } from "db"

type GetPropertyTypesInput = Pick<FindManyPropertyTypeArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPropertyTypes(
  { where, orderBy, skip = 0, take }: GetPropertyTypesInput,
  ctx: Ctx
) {
  ctx.session.$authorize(["admin", "superadmin"])

  const propertyTypes = await db.propertyType.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.propertyType.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    propertyTypes,
    nextPage,
    hasMore,
    count,
  }
}
