import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetCountriesInput = Pick<Prisma.FindManyCountryArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCountries(
  { where, orderBy, skip = 0, take }: GetCountriesInput,
  ctx: Ctx
) {
  ctx.session.$authorize(["admin", "superadmin"])

  const countries = await db.country.findMany({
    where,
    orderBy,
    take,
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
