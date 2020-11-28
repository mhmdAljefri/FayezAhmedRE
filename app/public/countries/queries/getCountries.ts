import db, { FindManyCountryArgs } from "db"

type GetCountriesInput = Pick<FindManyCountryArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCountries({ where, orderBy, skip = 0, take }: GetCountriesInput) {
  const countries = await db.country.findMany({
    where,
    orderBy,
    take,
    select: {
      id: true,
      name: true,
      image: true,
      rooms: true,
      nameEN: true,
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
