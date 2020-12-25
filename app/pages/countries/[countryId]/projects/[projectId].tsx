import React, { useEffect } from "react"
import { BlitzPage, useMutation } from "blitz"
import ProjectDetailsLayout from "app/layouts/ProjectDetailsLayout"
import getProject from "app/public/projects/queries/getProject"
import getProjects from "app/public/projects/queries/getProjects"
import { City, Country, Project, PropertyType, RoomWithPrice } from "@prisma/client"
import updateProject from "app/public/projects/mutations/updateProject"

type ProjectProps = {
  project: Project & {
    city: City
    country: Country
    roomsWithPrices: RoomWithPrice[]
    propertyType: PropertyType
  }
}

const ProjectPage: BlitzPage<ProjectProps> = ({ project }) => {
  const [updateProjectMutation] = useMutation(updateProject)

  useEffect(() => {
    updateProjectMutation({ where: { id: project.id } })
    return () => {}
  }, [project.id, updateProjectMutation])

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
