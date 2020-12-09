import React from "react"
import Layout from "app/layouts/Layout"
import ProjectsList from "app/layouts/ProjectsList"
import { BlitzPage } from "blitz"

const Projects: BlitzPage = () => {
  return <ProjectsList title="المشاريع" subTitle="" />
}

Projects.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="المشاريع">
    {page}
  </Layout>
)

export default Projects
