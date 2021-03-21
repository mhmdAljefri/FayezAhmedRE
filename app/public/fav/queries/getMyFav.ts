import db from "db"
import { Ctx, AuthenticationError } from "blitz"

export default async function getMyFav(_, ctx: Ctx) {
  const { userId } = ctx.session

  if (!userId) {
    throw new AuthenticationError()
  }

  const offers = await db.offer.findMany({
    where: { users: { some: { id: userId } } },
  })
  const projects = await db.project.findMany({
    where: { users: { some: { id: userId } } },
  })

  return { offers, projects }
}
