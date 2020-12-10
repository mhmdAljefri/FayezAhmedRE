import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetOprationCompanyPageInput = Pick<Prisma.FindFirstOprationCompanyPageArgs, "where">

export default async function getOprationCompanyPage(
  { where }: GetOprationCompanyPageInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const oprationCompanyPage = await db.oprationCompanyPage.findFirst({ where })

  if (!oprationCompanyPage) throw new NotFoundError()

  return oprationCompanyPage
}
