import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import Wrapper from "app/components/Wrapper"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <SignupForm onSuccess={() => router.push("/")} />
    </Wrapper>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
