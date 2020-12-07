import { Ctx } from "blitz"
import db from "db"

export default async function getNewRequestsCount(_empty, ctx: Ctx) {
  ctx.session.authorize("admin")

  const count = await db.request.count({ where: { isNew: true } })

  return {
    count,
  }
}
