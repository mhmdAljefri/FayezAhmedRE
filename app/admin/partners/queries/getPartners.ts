import { Ctx } from "blitz"
import db, { FindManyPartnerArgs } from "db"

type GetPartnersInput = Pick<FindManyPartnerArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPartners(
  { where, orderBy, skip = 0, take }: GetPartnersInput,
  ctx: Ctx
) {
  ctx.session.authorize(["admin", "superadmin"])

  const partners = await db.partner.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.partner.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    partners,
    nextPage,
    hasMore,
    count,
  }
}
