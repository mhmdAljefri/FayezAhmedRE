import AdminLayout from "app/layouts/AdminLayout"
import React from "react"

export default function AdminDashboard() {
  return <div>admin</div>
}

AdminDashboard.getLayout = (page) => <AdminLayout title={"Projects"}>{page}</AdminLayout>
