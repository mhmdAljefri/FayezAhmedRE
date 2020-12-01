import { Ctx } from "blitz"
import db, { ProjectUpdateArgs } from "db"

type CountryID = {
  data: {
    countryId?: string
  }
}
type UpdateProjectInput = Pick<ProjectUpdateArgs, "where" | "data"> & CountryID

export default async function updateProject({ where, data }: UpdateProjectInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  delete data.countryId

  const project = await db.project.update({ where, data: { ...data } })

  return project
}
