import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstFeatureArgs } from "db"

type GetFeatureInput = Pick<FindFirstFeatureArgs, "where">

export default async function getFeature({ where }: GetFeatureInput, ctx: Ctx) {
  ctx.session.$authorize(["admin", "superadmin"])

  const feature = await db.feature.findFirst({ where })

  if (!feature) throw new NotFoundError()

  return feature
}
