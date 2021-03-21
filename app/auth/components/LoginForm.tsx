import React from "react"
import { useMutation, Link } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput } from "app/auth/validations"
import { Heading, Text, Link as ThemeLink } from "theme-ui"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <Heading sx={{ fontSize: 5, pt: 4, mb: 2, pb: 2 }}>مرحباً مرة اخرى</Heading>
      <Text sx={{ mb: 4, fontSize: 3 }}>قم بادخال بيانات لاتمام عملية تسجيل الدخول.</Text>

      <Form
        submitText="تسجيل الدخول"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.name === "AuthenticationError") {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
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
      </Form>
      <Text sx={{ mt: 4 }}>
        لاتملك حساب؟
        <Link passHref href="/signup">
          <ThemeLink>انشاء حساب</ThemeLink>
        </Link>
      </Text>
    </div>
  )
}

export default LoginForm
