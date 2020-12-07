import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateRequestInput = Pick<Prisma.RequestUpdateArgs, "where" | "data">

export default async function updateRequest({ where, data }: UpdateRequestInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const request = await db.request.update({ where, data: { ...data } })

  return request
}
