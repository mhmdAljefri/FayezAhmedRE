import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteContactInput = Pick<Prisma.ContactDeleteArgs, "where">

export default async function deleteContact({ where }: DeleteContactInput, ctx: Ctx) {
  ctx.session.$authorize()

  const contact = await db.contact.delete({ where })

  return contact
}
