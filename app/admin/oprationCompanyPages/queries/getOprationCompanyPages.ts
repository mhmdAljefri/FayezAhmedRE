import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetOprationCompanyPagesInput = Pick<
  Prisma.FindManyOprationCompanyPageArgs,
  "where" | "orderBy" | "skip" | "take"
>

export default async function getOprationCompanyPages(
  { where, orderBy, skip = 0, take }: GetOprationCompanyPagesInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const oprationCompanyPages = await db.oprationCompanyPage.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.oprationCompanyPage.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    oprationCompanyPages,
    nextPage,
    hasMore,
    count,
  }
}
