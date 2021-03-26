import db, { Prisma } from "db"
import { Ctx } from "blitz"

type GetProjectsInput = Pick<
  Prisma.FindManyProjectArgs,
  "where" | "orderBy" | "skip" | "take" | "include"
>

export default async function getProjects(
  { where, orderBy, skip = 0, include, take }: GetProjectsInput,
  ctx?: Ctx
) {
  const userId = ctx?.session?.userId

  let projects = await db.project.findMany({
    where: { ...where, country: { ...(where?.country as any), suspend: false } },
    orderBy,
    take,
    include: {
      ...include,
      users: true,
    },
    skip,
  })

  // dont't pass users to projects list here
  projects = projects.map(({ users, ...project }) => ({
    ...project,
    hasFav: users.some(({ id }) => id === userId),
  })) as any

  const count = await db.project.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    projects,
    nextPage,
    hasMore,
    count,
  }
}
