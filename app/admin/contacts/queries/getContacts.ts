import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetContactsInput = Pick<Prisma.FindManyContactArgs, "where" | "orderBy" | "skip" | "take">

export default async function getContacts(
  { where, orderBy, skip = 0, take }: GetContactsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const contacts = await db.contact.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.contact.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    contacts,
    nextPage,
    hasMore,
    count,
  }
}
