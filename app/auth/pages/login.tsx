import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import Wrapper from "app/components/Wrapper"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <LoginForm onSuccess={() => router.push("/")} />
    </Wrapper>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
