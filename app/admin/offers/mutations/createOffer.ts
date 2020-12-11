import { Ctx } from "blitz"
import db, { Prisma } from "db"

export type CreateProjectInputType = {
  data: Omit<Prisma.ProjectCreateArgs["data"], "country">
  countryId: number
}

export default async function createProject({ data, countryId }: CreateProjectInputType, ctx: Ctx) {
  ctx.session.authorize("admin")

  try {
    const offer = await db.offer.create({
      data: {
        ...data,
        country: {
          connect: {
            id: countryId,
          },
        },
      },
    })
    return offer
  } catch (error) {
    console.error(error)
  }
}
