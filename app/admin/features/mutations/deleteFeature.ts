import { Ctx } from "blitz"
import db, { FeatureDeleteArgs } from "db"

type DeleteFeatureInput = Pick<FeatureDeleteArgs, "where">

export default async function deleteFeature({ where }: DeleteFeatureInput, ctx: Ctx) {
  ctx.session.$authorize(["admin", "superadmin"])

  const feature = await db.feature.delete({ where })

  return feature
}
