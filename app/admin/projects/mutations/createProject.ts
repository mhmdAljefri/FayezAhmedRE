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
  const purposeId = (data as any).purposeId
  delete (data as any).cityId
  delete (data as any).propertyTypeId
  delete (data as any).purposeId

  const project = await db.project.create({
    data: {
      ...data,
      isDelux: `${data.isDelux}` === "true",
      isHousingComplex: `${data.isHousingComplex}` === "true",
      isGrantedByGov: `${data.isGrantedByGov}` === "true",
      isWithSeaView: `${data.isWithSeaView}` === "true",
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
      purpose: {
        connect: {
          id: purposeId,
        },
      },
    },
  })
  return project
}
