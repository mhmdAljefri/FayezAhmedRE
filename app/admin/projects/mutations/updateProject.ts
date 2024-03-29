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
  const purposeId = (data as any).purposeId

  delete (data as any).cityId
  delete (data as any).propertyTypeId
  delete (data as any).purposeId

  const oldProject = await db.project.findFirst({ where, select: { roomsWithPrices: true } })

  // compare project roomsWithPrices with new roomsWithPrices
  const oldRoomsIds: number[] = []
  const allRoomsIds: number[] = []
  const removableOldRoomsIds: number[] = [] // to be removed
  const oldRooms: RoomWithPrice[] = [] // to be updated
  const newRooms: RoomWithPrice[] = [] // to be created

  oldProject?.roomsWithPrices.forEach(({ id }) => {
    allRoomsIds.push(id)
  })
  roomsWithPrices.forEach(({ id, ...room }) => {
    if (id) {
      oldRooms.push({ ...room, id })
      oldRoomsIds.push(id)
    } else {
      newRooms.push({ ...room, id })
    }
  })
  allRoomsIds.forEach((id) => {
    console.log({ id, oldRoomsIds }, !oldRoomsIds.includes(id))
    if (!oldRoomsIds.includes(id)) removableOldRoomsIds.push(id)
  })

  // remove unfounded ids
  // update exist data
  // create new data

  const project = await db.project.update({
    where,
    data: {
      ...data,
      constructingUpdateVideo: data.constructingUpdateVideo || null,
      isDelux: `${data.isDelux}` === "true",
      isHousingComplex: `${data.isHousingComplex}` === "true",
      isGrantedByGov: `${data.isGrantedByGov}` === "true",
      isWithSeaView: `${data.isWithSeaView}` === "true",
      country: {
        connect: {
          id: countryId,
        },
      },
      roomsWithPrices: {
        delete: removableOldRoomsIds.map((id) => ({ id })),
        update: oldRooms.map(({ id, projectId: _unusedParamater, roomPrice, ...rest }) => ({
          where: { id },
          data: { ...rest, roomPrice: parseFloat(roomPrice as any) },
        })),
        create: newRooms,
      },
      propertyType: {
        connect: { id: parseInt(propertyTypeId) },
      },
      city: {
        connect: { id: parseInt(cityId) },
      },
      purpose: {
        connect: {
          id: parseInt(purposeId),
        },
      },
    },
  })

  return project
}
