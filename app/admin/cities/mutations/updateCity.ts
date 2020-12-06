import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateCityInput = {
  where: Prisma.CityUpdateArgs["where"]
  data: Omit<Prisma.CityUpdateArgs["data"], "country">
}

export default async function updateCity({ where, data }: UpdateCityInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  // Don't allow updating
  delete (data as any).country
  delete (data as any).countryId
  delete (data as any).id

  const city = await db.city.update({ where, data })

  return city
}
