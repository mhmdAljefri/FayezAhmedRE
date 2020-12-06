import db, { FindManyProjectArgs } from "db"

type GetProjectsInput = Pick<FindManyProjectArgs, "where" | "orderBy" | "skip" | "take" | "select">

export default async function getProjects({
  where,
  select,
  orderBy,
  skip = 0,
  take,
}: GetProjectsInput) {
  const projects = await db.project.findMany({
    where,
    orderBy,
    take,
    select,
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
