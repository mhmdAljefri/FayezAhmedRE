import { Ctx } from "blitz"
import db, { Prisma, RoomWithPrice } from "db"

export type CreateProjectInputType = {
  data: Omit<Prisma.ProjectCreateArgs["data"], "country">
  countryId: number
  roomsWithPrices?: RoomWithPrice[]
}

export default async function createProject(
  { data, countryId, roomsWithPrices }: CreateProjectInputType,
  ctx: Ctx
) {
  ctx.session.authorize(["admin", "superadmin"])

  const cityId = (data as any).cityId
  const propertyTypeId = (data as any).propertyTypeId
  delete (data as any).cityId
  delete (data as any).propertyTypeId

  const project = await db.project.create({
    data: {
      ...data,
      isHousingComplex: (data.isHousingComplex as any) === "true",
      propertyType: {
        connect: {
          id: parseInt(propertyTypeId),
        },
      },
      roomsWithPrices: {
        create: roomsWithPrices,
      },
      country: {
        connect: {
          id: countryId,
        },
      },
      city: {
        connect: {
          id: parseInt(cityId),
        },
      },
    },
  })
  return project
}
