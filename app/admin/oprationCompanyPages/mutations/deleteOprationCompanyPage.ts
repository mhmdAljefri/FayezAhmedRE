import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteOprationCompanyPageInput = Pick<Prisma.OprationCompanyPageDeleteArgs, "where">

export default async function deleteOprationCompanyPage(
  { where }: DeleteOprationCompanyPageInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const oprationCompanyPage = await db.oprationCompanyPage.delete({ where })

  return oprationCompanyPage
}
