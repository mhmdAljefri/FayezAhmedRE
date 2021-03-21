import db, { Prisma } from "db"

type GetCountriesInput = Pick<
  Prisma.FindManyCountryArgs,
  "where" | "orderBy" | "skip" | "take" | "select"
>

export default async function getCountries({
  where,
  orderBy = { id: "asc" },
  skip = 0,
  select,
  take,
}: GetCountriesInput) {
  const countries = await db.country.findMany({
    where: { ...where, suspend: false },
    orderBy,
    take,
    select: {
      ...select,
      id: true,
      name: true,
      image: true,
      rooms: true,
      nameEN: true,
      isTurkey: true,
    },
    skip,
  })

  const count = await db.country.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    countries,
    nextPage,
    hasMore,
    count,
  }
}
