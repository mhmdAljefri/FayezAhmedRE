import { NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetCountryInput = Pick<Prisma.FindFirstCountryArgs, "where">

export default async function getCountry({ where }: GetCountryInput) {
  const country = await db.country.findFirst({
    where,
    select: {
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
      cities: true,
      offers: {
        take: 3,
      },
      rooms: true,
      isTurkey: true,
      name: true,
      explores: true,
      oprationCompanyPages: true,
    },
  })

  if (!country) throw new NotFoundError()

  return country
}
