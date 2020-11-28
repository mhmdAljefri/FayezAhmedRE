import React, { ReactNode, PropsWithoutRef } from "react"
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
  FormRenderProps as FinalFormRenderProps,
} from "react-final-form"
import { Button, SxStyleProp } from "theme-ui"
import * as z from "zod"
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
  getValues?: (values: FinalFormRenderProps<z.infer<S>>["values"]) => void
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
  getValues,
  buttonProps,
  ...props
}: FormProps<S>) {
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
      mutators={mutators}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError, values }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {getValues?.(values)}
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
