import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetRequestsInput = Pick<Prisma.FindManyRequestArgs, "where" | "orderBy" | "skip" | "take">

export default async function getRequests(
  { where, orderBy, skip = 0, take }: GetRequestsInput,
  ctx: Ctx
) {
  ctx.session.$authorize(["admin", "superadmin"])

  const requests = await db.request.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.request.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    requests,
    nextPage,
    hasMore,
    count,
  }
}
