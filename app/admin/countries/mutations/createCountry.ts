import { Ctx } from "blitz"
import db, { CountryCreateArgs } from "db"

type CreateCountryInput = Pick<CountryCreateArgs, "data">
export default async function createCountry({ data }: CreateCountryInput, ctx: Ctx) {
  ctx.session.$authorize(["admin", "superadmin"])

  const country = await db.country.create({ data })

  return country
}
