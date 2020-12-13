import { Ctx } from "blitz"
import db, { CountryDeleteArgs } from "db"

type DeleteCountryInput = Pick<CountryDeleteArgs, "where">

export default async function deleteCountry({ where }: DeleteCountryInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const country = await db.country.delete({ where })

  return country
}
