import React from "react"
import Layout from "app/layouts/Layout"
import OfferssList from "app/layouts/OfferssList"

function WhatsNew() {
  return <OfferssList name="جديدنا" details="" />
}

WhatsNew.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="جديدنا">
    {page}
  </Layout>
)

export default WhatsNew
