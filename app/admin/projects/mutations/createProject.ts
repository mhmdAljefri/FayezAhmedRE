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
  ctx.session.authorize("admin")

  const cityId = (data as any).cityId
  delete (data as any).cityId

  try {
    const project = await db.project.create({
      data: {
        ...data,
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
  } catch (error) {
    console.error(error)
  }
}
