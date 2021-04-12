import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetContactInput = Pick<Prisma.FindFirstContactArgs, "where">

export default async function getContact({ where }: GetContactInput, ctx: Ctx) {
  ctx.session.$authorize()

  const contact = await db.contact.findFirst({ where })

  if (!contact) throw new NotFoundError()

  return contact
}
