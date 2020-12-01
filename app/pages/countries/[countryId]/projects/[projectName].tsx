import React from "react"
import { BlitzPage } from "blitz"
import ProjectDetailsLayout from "app/layouts/ProjectDetailsLayout"
import getProject from "app/public/projects/queries/getProject"

type ProjectProps = {
  project: any
}

const Project: BlitzPage<ProjectProps> = ({ project }) => {
  return <ProjectDetailsLayout {...project} />
}

export default Project

export async function getServerSideProps(context) {
  const { projectName } = context.params
  const project = await getProject({ where: { name: projectName } })

  return {
    props: { project }, // will be passed to the page component as props
  }
}