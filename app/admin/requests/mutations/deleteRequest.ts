import { Ctx } from "blitz"
import db, { RequestDeleteArgs } from "db"

type DeleteRequestInput = Pick<RequestDeleteArgs, "where">

export default async function deleteRequest({ where }: DeleteRequestInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  const request = await db.request.delete({ where })

  return request
}
