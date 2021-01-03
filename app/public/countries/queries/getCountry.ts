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
        include: {
          roomsWithPrices: true,
        },
      },
      cities: true,
      offers: {
        take: 3,
      },
      carouselImages: true,
      rooms: true,
      isTurkey: true,
      name: true,
      explores: {
        take: 9,
        orderBy: {
          id: "desc",
        },
      },
      oprationCompanyPages: true,
    },
  })

  if (!country) throw new NotFoundError()

  return country
}
