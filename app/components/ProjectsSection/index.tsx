import { Heading } from "@theme-ui/components"
import React, { useState } from "react"
import HeadingWithMoreLink from "../HeadingWithMoreLink"
import ProjectSlider from "../Sliders/ProjectSlider"
import Wrapper from "../Wrapper"
import CitiesFilter, { SelectedCity } from "app/components/CitiesFilter"
import { City, Project } from "db"
import ShowMoreButton from "../ShowMoreButton"

type Props = {
  cities: City[]
  projects: Project[]
  projectsPagePath: string
}
const ProjectsSection = ({ projectsPagePath, projects: initialProject, cities }: Props) => {
  const [selected, setSelected] = useState<SelectedCity>({ id: "اظهار الكل", name: "اظهار الكل" })
  const [projects, setProjects] = useState<any[]>(initialProject)

  const updateProjects = ({ id, hasFav }) => {
    const updateProjects = projects.map((project) => {
      if (project.id === id) {
        console.log({ project })
        return { ...project, hasFav }
      }

      console.log(project)

      return project
    })

    setProjects(updateProjects)
  }

  return (
    <Wrapper
      sx={{
        my: 4,
      }}
    >
      <HeadingWithMoreLink
        sx={{
          display: ["none", "none", "unset"],
        }}
        href={projectsPagePath}
        heading="مشاريعنا"
      />
      <Heading sx={{ mb: 3, pb: 4, fontSize: 2 }}>منزلك الجديد بانتظارك</Heading>
      <CitiesFilter
        selected={selected}
        onClick={(city) => setSelected({ name: city.name, id: city.id })}
        cities={cities}
      />
      {typeof selected.id === "string" ? (
        // all projects
        <ProjectSlider projects={projects as any} onFavSuccess={updateProjects} />
      ) : (
        // projects by city
        <ProjectSlider
          onFavSuccess={updateProjects}
          projects={projects.filter((project) => project.cityId === selected.id) as any}
        />
      )}
      <ShowMoreButton href={projectsPagePath} />
    </Wrapper>
  )
}

export default ProjectsSection
