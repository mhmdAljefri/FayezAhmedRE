import React from "react"
import Layout from "app/layouts/Layout"
import OprationCompaniesListLayout from "app/layouts/OprationCompaniesListLayout"

function WhatsNew() {
  return <OprationCompaniesListLayout title="الشركات العاملة" description="" />
}

WhatsNew.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="الشركات العاملة">
    {page}
  </Layout>
)

export default WhatsNew
