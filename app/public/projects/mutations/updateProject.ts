import db, { Prisma } from "db"

type UpdateProjectInput = Pick<Prisma.ProjectUpdateArgs, "where">

export default async function updateProject({ where }: UpdateProjectInput) {
  const { views } = (await db.project.findFirst({ where })) || {}

  // check if we had project with id
  if (views !== undefined) {
    await db.project.update({
      where,
      data: {
        views: views + 1,
      },
    })
  }
}
