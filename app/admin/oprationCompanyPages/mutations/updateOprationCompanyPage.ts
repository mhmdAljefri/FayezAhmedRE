import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateOprationCompanyPageInput = {
  where: Prisma.OprationCompanyPageUpdateArgs["where"]
  data: Omit<Prisma.OprationCompanyPageUpdateArgs["data"], "country">
  countryId: number
}

export default async function updateOprationCompanyPage(
  { where, data }: UpdateOprationCompanyPageInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  // Don't allow updating
  delete (data as any).country

  const oprationCompanyPage = await db.oprationCompanyPage.update({ where, data })

  return oprationCompanyPage
}
