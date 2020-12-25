import db, { Prisma } from "db"

type UpdateProjectInput = Pick<Prisma.ProjectUpdateArgs, "where">

export default async function updateProject({ where }: UpdateProjectInput) {
  // compare project roomsWithPrices with new roomsWithPrices
  const { views } = (await db.project.findFirst({ where })) || {}
  if (views) {
    await db.project.update({
      where,
      data: {
        views: views + 1,
      },
    })
  }
}
