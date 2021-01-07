import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetExploreInput = Pick<Prisma.FindFirstExploreArgs, "where">

export default async function getExplore({ where }: GetExploreInput, ctx: Ctx) {
  ctx.session.authorize()

  const explore = await db.explore.findFirst({
    where,
    select: {
      title: true,
      description: true,
      image: true,
      videoUrl: true,
      id: true,
      type: true,
    },
  })

  if (!explore) throw new NotFoundError()

  return explore
}
