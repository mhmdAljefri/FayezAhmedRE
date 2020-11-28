import { Ctx } from "blitz"
import db, { ProjectUpdateArgs } from "db"

type UpdateProjectInput = Pick<ProjectUpdateArgs, "where" | "data">

export default async function updateProject({ where, data }: UpdateProjectInput, ctx: Ctx) {
  ctx.session.authorize("admin")

  const project = await db.project.update({ where, data })

  return project
}
