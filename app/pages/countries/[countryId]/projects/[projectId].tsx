import React from "react"
import { BlitzPage } from "blitz"
import ProjectDetailsLayout from "app/layouts/ProjectDetailsLayout"
import getProject from "app/public/projects/queries/getProject"
import getProjects from "app/public/projects/queries/getProjects"
import { Project } from "@prisma/client"

type ProjectProps = {
  project: any
}

const ProjectPage: BlitzPage<ProjectProps> = ({ project }) => {
  return <ProjectDetailsLayout {...project} />
}

export default ProjectPage

export async function getStaticPaths() {
  const { projects } = await getProjects({})
  const paths = projects.map((project: Project) => ({
    params: {
      countryId: `${project.countryId}`,
      projectId: `${project.id}`,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const projectId = parseInt(context.params.projectId)
  const project = await getProject({ where: { id: projectId } })

  return {
    props: { project }, // will be passed to the page component as props
    revalidate: 60 * 2,
  }
}
