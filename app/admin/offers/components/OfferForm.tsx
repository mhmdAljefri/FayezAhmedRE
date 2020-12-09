import { Offer, Prisma } from "@prisma/client"
import LabeledMenuField from "app/admin/components/LabeledMenuField"
import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import ReactReachTextEditor from "app/admin/components/ReactReachTextEditor"
import getProjects from "app/admin/projects/queries/getProjects"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import { usePaginatedQuery } from "blitz"
import React from "react"
import { Field } from "react-final-form"
import { Button, Label } from "theme-ui"

type OfferFormProps = {
  initialValues: any
  onSubmit: (
    values: Omit<Prisma.OfferCreateInput, "createdAt"> & { projectId: string | number }
  ) => Promise<any>
}

const OfferForm = ({ initialValues, onSubmit }: OfferFormProps) => {
  const [{ projects }] = usePaginatedQuery(getProjects, {})

  if (typeof window === "undefined") return <div />

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      <LabeledTextField name="title" label="العنوان" />
      <LabeledTextField name="subTitle" label="وصف مختصر" />
      <MediaWidthTextField name="image" label="غلاف العرض" />

      <LabeledMenuField
        options={projects}
        getLabel={(t) => t.name}
        getValue={(t) => t.id}
        name="projectId"
        label="المشروع"
      />

      <Label>المحتوى الرئيسي للعرض</Label>
      <Field name="reachText" render={({ input }) => <ReactReachTextEditor {...input} />} />
      <Button>تاكيد</Button>
    </Form>
  )
}

export default OfferForm
