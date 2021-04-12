import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteProjectInput = Pick<Prisma.ProjectDeleteArgs, "where">

export default async function deleteProject({ where }: DeleteProjectInput, ctx: Ctx) {
  ctx.session.$authorize(["admin", "superadmin"])

  const project = await db.project.delete({ where })

  return project
}
