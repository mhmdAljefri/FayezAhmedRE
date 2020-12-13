import { Ctx } from "blitz"
import db, { FeatureUpdateArgs } from "db"

type UpdateFeatureInput = Pick<FeatureUpdateArgs, "where" | "data">

export default async function updateFeature({ where, data }: UpdateFeatureInput, ctx: Ctx) {
  ctx.session.authorize(["admin", "superadmin"])

  delete (data as any).id

  const feature = await db.feature.update({ where, data })

  return feature
}
