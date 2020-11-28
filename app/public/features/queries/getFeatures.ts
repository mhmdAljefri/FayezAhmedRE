import db, { FindManyFeatureArgs } from "db"

type GetFeaturesInput = Pick<FindManyFeatureArgs, "where" | "orderBy" | "skip" | "take">

export default async function getFeatures({ where, orderBy, skip = 0, take }: GetFeaturesInput) {
  const features = await db.feature.findMany({
    where,
    orderBy,
    take,
    select: {
      name: true,
      image: true,
    },
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
