import db, { Prisma } from "db"

type GetProjectsInput = Pick<
  Prisma.FindManyProjectArgs,
  "where" | "orderBy" | "skip" | "take" | "include"
>

export default async function getProjects({
  where,
  orderBy,
  skip = 0,
  include,
  take,
}: GetProjectsInput) {
  const projects = await db.project.findMany({
    where: { ...where, country: { suspend: false } },
    orderBy,
    take,
    include,
    skip,
  })

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
