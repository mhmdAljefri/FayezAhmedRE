import { Ctx } from "blitz"
import db, { Prisma, RoomWithPrice } from "db"

type UpdateProjectInput = Pick<Prisma.ProjectUpdateArgs, "where" | "data"> & {
  countryId: number
  roomsWithPrices: RoomWithPrice[]
}

export default async function updateProject(
  { where, data, countryId, roomsWithPrices }: UpdateProjectInput,
  ctx: Ctx
) {
  ctx.session.authorize(["admin", "superadmin"])

  // todo fide removed room and delete it from database
  // todo fide new room and create it with relation
  const cityId = (data as any).cityId
  const propertyTypeId = (data as any).propertyTypeId
  delete (data as any).cityId
  delete (data as any).propertyTypeId

  const project = await db.project.update({
    where,
    data: {
      ...data,
      country: {
        connect: {
          id: countryId,
        },
      },
      propertyType: {
        connect: { id: parseInt(propertyTypeId) },
      },
      city: {
        connect: { id: parseInt(cityId) },
      },
    },
  })

  return project
}
