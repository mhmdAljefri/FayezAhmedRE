import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import Wrapper from "app/components/Wrapper"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Wrapper sx={{ py: [3, 4, 5], px: 4, maxWidth: 580 }}>
      <SignupForm onSuccess={() => router.back()} />
    </Wrapper>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
