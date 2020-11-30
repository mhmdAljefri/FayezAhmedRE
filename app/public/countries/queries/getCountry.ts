import { NotFoundError } from "blitz"
import db, { FindFirstCountryArgs } from "db"

type GetCountryInput = Pick<FindFirstCountryArgs, "where">

export default async function getCountry({ where }: GetCountryInput) {
  const country = await db.country.findFirst({
    where,
    select: {
      name: true,
      rooms: true,
      cities: true,
      projects: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  if (!country) throw new NotFoundError()

  return country
}
