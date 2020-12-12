import { NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetCityInput = Pick<Prisma.FindFirstCityArgs, "where">

export default async function getCity({ where }: GetCityInput) {
  const city = await db.city.findFirst({ where })

  if (!city) throw new NotFoundError()

  return city
}
