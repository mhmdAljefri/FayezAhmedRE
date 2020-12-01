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
      id: true,
      projects: {
        take: 3,
        orderBy: {
          id: "desc",
        },
        select: {
          name: true,
          subTitle: true,
          image: true,
        },
      },
    },
  })

  if (!country) throw new NotFoundError()

  return country
}
