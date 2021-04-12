import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateOprationCompanyPageInput = {
  data: Omit<Prisma.OprationCompanyPageCreateArgs["data"], "country">
  countryId: number
}
export default async function createOprationCompanyPage(
  { data, countryId }: CreateOprationCompanyPageInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const oprationCompanyPage = await db.oprationCompanyPage.create({
    data: { ...data, country: { connect: { id: countryId } } },
  })

  return oprationCompanyPage
}
