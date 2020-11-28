import { Ctx } from "blitz"
import db, { FindManyFeatureArgs } from "db"

type GetFeaturesInput = Pick<FindManyFeatureArgs, "where" | "orderBy" | "skip" | "take">

export default async function getFeatures(
  { where, orderBy, skip = 0, take }: GetFeaturesInput,
  ctx: Ctx
) {
  ctx.session.authorize("admin")

  const features = await db.feature.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.feature.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    features,
    nextPage,
    hasMore,
    count,
  }
}
