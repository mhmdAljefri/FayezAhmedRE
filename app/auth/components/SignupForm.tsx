import React from "react"
import { useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import signup from "app/auth/mutations/signup"
import { SignupInput } from "app/auth/validations"
import { Heading } from "theme-ui"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <Heading sx={{ fontSize: 5, mb: 2, pb: 2 }}>انشاء حساب</Heading>

      <Form
        submitText="انشاء حساب"
        schema={SignupInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async ({ email, password, confirm }) => {
          try {
            await signupMutation({ email, password, confirm })
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "البريد الالكتروني مستخدم سابقاً" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="البريد الالكتروني" placeholder="Email" />
        <LabeledTextField
          name="password"
          label="كلمة المرور"
          placeholder="كلمة المرور"
          type="password"
        />
        <LabeledTextField
          name="confirm"
          label="تاكيد كلمة المرور"
          placeholder="تاكيد كلمة المرور"
          type="password"
        />
      </Form>
    </div>
  )
}

export default SignupForm
