import { Ctx } from "blitz"
import db, { CountryUpdateArgs } from "db"

type UpdateCountryInput = Pick<CountryUpdateArgs, "where" | "data">

export default async function updateCountry({ where, data }: UpdateCountryInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const country = await db.country.update({ where, data })

  return country
}