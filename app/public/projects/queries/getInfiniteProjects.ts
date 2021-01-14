import db, { Prisma } from "db"

type GetProjectsInfiniteInput = Pick<
  Prisma.FindManyProjectArgs,
  "where" | "orderBy" | "skip" | "take" | "select"
>

export default async function getProjectsInfinite({
  where,
  orderBy,
  take,
  skip,
}: GetProjectsInfiniteInput) {
  const projects = await db.project.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      roomsWithPrices: true,
    },
  })
  const count = await db.project.count()
  const hasMore = skip! + take! < count
  const nextPage = hasMore ? { take, skip: skip! + take! } : null
  return {
    projects,
    nextPage,
  }
}
