import db, { Prisma } from "db"
import { Ctx } from "blitz"

type GetProjectsInfiniteInput = Pick<
  Prisma.FindManyProjectArgs,
  "where" | "orderBy" | "skip" | "take" | "select"
>

export default async function getProjectsInfinite(
  { where, orderBy, take, skip }: GetProjectsInfiniteInput,
  ctx?: Ctx
) {
  const userId = ctx?.session?.userId

  let projects = await db.project.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      roomsWithPrices: {
        orderBy: {
          roomPrice: "asc",
        },
      },
      users: true,
    },
  })

  // dont't pass users to projects list here
  projects = projects.map(({ users, ...offer }) => ({
    ...offer,
    hasFav: users.some(({ id }) => id === userId),
  })) as any
  const count = await db.project.count()
  const hasMore = skip! + take! < count
  const nextPage = hasMore ? { take, skip: skip! + take! } : null
  return {
    projects,
    nextPage,
  }
}
