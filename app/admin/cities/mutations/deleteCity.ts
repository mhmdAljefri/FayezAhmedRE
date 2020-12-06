import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteCityInput = Pick<Prisma.CityDeleteArgs, "where">

export default async function deleteCity({ where }: DeleteCityInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const city = await db.city.delete({ where })

  return city
}
