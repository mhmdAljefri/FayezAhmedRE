import db, { FindManyFurnishCategoryArgs } from "db"

type GetFurnishCategoriesInput = Pick<
  FindManyFurnishCategoryArgs,
  "where" | "orderBy" | "skip" | "take" | "select"
>

export default async function getFurnishCategories({
  where,
  orderBy,
  skip = 0,
  take,
  select,
}: GetFurnishCategoriesInput) {
  const furnishCategories = await db.furnishCategory.findMany({
    where,
    orderBy,
    take,
    skip,
    select,
  })

  const count = await db.furnishCategory.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    furnishCategories,
    nextPage,
    hasMore,
    count,
  }
}
