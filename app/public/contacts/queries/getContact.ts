import { NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetContactInput = Pick<Prisma.FindFirstContactArgs, "where">

export default async function getContact({ where }: GetContactInput) {
  const contact = await db.contact.findFirst({ where })

  if (!contact) throw new NotFoundError()

  return contact
}
