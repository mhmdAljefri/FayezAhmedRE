import AdminLayout from "app/layouts/AdminLayout"
import React from "react"

function Dashboard() {
  return <div>dsds</div>
}

Dashboard.getLayout = (page) => <AdminLayout title={"Projects"}>{page}</AdminLayout>

export default Dashboard
