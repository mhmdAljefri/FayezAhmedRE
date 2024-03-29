import { NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetCountryInput = Pick<Prisma.FindFirstCountryArgs, "where">
export default async function getCountry({ where }: GetCountryInput) {
  const country = await db.country.findFirst({
    where,
    select: {
      id: true,
      cities: true,
      offers: {
        take: 3,
        orderBy: { id: "desc" },
      },
      carousel: true,
      rooms: true,
      isTurkey: true,
      name: true,
      oprationCompanyPages: true,
      explores: {
        where: { type: "dontMissitGallery" },
        take: 9,
      },
    },
  })

  if (!country) throw new NotFoundError()

  return country
}
