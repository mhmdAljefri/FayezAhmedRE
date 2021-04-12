import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateContactInput = {
  data: Omit<Prisma.ContactCreateArgs["data"], "country">
  countryId: number
}
export default async function createContact({ data, countryId }: CreateContactInput, ctx: Ctx) {
  ctx.session.$authorize()

  const contact = await db.contact.create({
    data: { ...data, country: { connect: { id: countryId } } },
  })

  return contact
}
