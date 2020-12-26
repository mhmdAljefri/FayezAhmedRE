import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import arrayMutators from "final-form-arrays"

import { Box, Button, SxStyleProp } from "theme-ui"
import * as z from "zod"
import { useRouter } from "blitz"
import { BounceLoader } from "react-spinners"
export { FORM_ERROR } from "final-form"

type FormProps<S extends z.ZodType<any, any>> = {
  /** All your form fields */
  children: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  buttonProps?: {
    sx: SxStyleProp
  }
  schema?: S

  mutators?: any
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  mutators,
  buttonProps,
  ...props
}: FormProps<S>) {
  const { pathname } = useRouter()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}
          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}
          {submitText && (
            <Button {...buttonProps} type="submit" disabled={submitting}>
              {submitText}
            </Button>
          )}
          {submitting && isAdmin && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ":before": {
                  backgroundColor: "primary",
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: 0.4,
                  bottom: 0,
                  content: '""',
                  position: "absolute",
                },
              }}
            >
              <BounceLoader />
            </Box>
          )}
          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    />
  )
}

export default Form
