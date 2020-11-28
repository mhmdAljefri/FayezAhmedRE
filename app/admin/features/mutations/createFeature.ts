import { Ctx } from "blitz"
import db, { FeatureCreateArgs } from "db"

type CreateFeatureInput = Pick<FeatureCreateArgs, "data">
export default async function createFeature({ data }: CreateFeatureInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const feature = await db.feature.create({ data })

  return feature
}
