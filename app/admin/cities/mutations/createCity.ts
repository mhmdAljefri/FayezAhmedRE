import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateCityInput = {
  data: Omit<Prisma.CityCreateArgs["data"], "country" | "createdAt" | "updatedAt">
  countryId: number
}
export default async function createCity({ data, countryId }: CreateCityInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const city = await db.city.create({
    data: { ...data, country: { connect: { id: countryId } } },
  })

  return city
}
