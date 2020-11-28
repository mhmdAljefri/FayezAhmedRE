import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

export const CreateProjectInput = z.object({
  data: z.object({
    name: z.string(),
    details: z.string().min(10).max(100),
    subTitle: z.string(),
    status: z.enum(["completed", "inprogress"]),
    location: z.object({
      latitude: z.string(),
      longitude: z.string(),
    }),

    country: z.object({
      connect: z.object({
        id: z.string(),
      }),
    }),
  }),
})

export type CreateProjectInputType = z.infer<typeof CreateProjectInput>

export default async function createProject({ data }: CreateProjectInputType, ctx: Ctx) {
  ctx.session.authorize("admin")

  const countryId: number = parseInt(data.country.connect.id)

  try {
    const project = await db.project.create({
      data: {
        ...data,
        country: {
          connect: {
            id: countryId,
          },
        },
      },
    })
    return project
  } catch (error) {
    console.error(error)
  }
}
