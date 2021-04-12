import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstCountryArgs } from "db"

type GetCountryInput = Pick<FindFirstCountryArgs, "where">

export default async function getCountry({ where }: GetCountryInput, ctx: Ctx) {
  ctx.session.$authorize(["admin", "superadmin"])

  const country = await db.country.findFirst({ where })

  if (!country) throw new NotFoundError()

  return country
}
