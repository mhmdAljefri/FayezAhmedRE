import { Ctx } from "blitz"
import db, { FeatureDeleteArgs } from "db"

type DeleteFeatureInput = Pick<FeatureDeleteArgs, "where">

export default async function deleteFeature({ where }: DeleteFeatureInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const feature = await db.feature.delete({ where })

  return feature
}
