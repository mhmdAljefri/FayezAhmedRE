import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateContactInput = {
  where: Prisma.ContactUpdateArgs["where"]
  data: Omit<Prisma.ContactUpdateArgs["data"], "country">
  countryId: number
}

export default async function updateContact({ where, data }: UpdateContactInput, ctx: Ctx) {
  ctx.session.authorize()

  // Don't allow updating
  delete (data as any).id
  delete (data as any).country
  delete (data as any).countryId

  const contact = await db.contact.update({ where, data })

  return contact
}
