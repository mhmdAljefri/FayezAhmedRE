import React from "react"
import { Box, Heading } from "theme-ui"
import Form from "../Form"
import LabeledTextField from "../LabeledTextField"
import useRequestsMutation from "app/hooks/useRequestsMutation"
import SubmitButton from "../SubmitButton"
import Fade from "react-reveal/Fade"
import LabeledMenuField from "app/admin/components/LabeledMenuField"

export default function Enquire() {
  const { run, fetching } = useRequestsMutation("enquire")

  return (
    <Fade bottom>
      <Box
        sx={{
          maxWidth: 1000,
          marginX: "auto",
          marginY: 5,
          backgroundColor: "primary",
          borderRadius: "lg",
          boxShadow: "default",
          position: "relative",
          paddingX: 4,
          paddingBottom: 4,
        }}
      >
        <Heading sx={{ fontSize: [4, 6], paddingTop: 5, paddingBottom: 4, color: "white" }}>
          استفسر الان
        </Heading>
        <Form onSubmit={run}>
          <LabeledMenuField
            label="الاستفسار عن"
            name="callingTime"
            options={[
              { id: "sells", name: "المبيعات" },
              { id: "customer-success", name: "خدمة العملاء" },
              { id: "furnish", name: "الاثاث" },
            ]}
            getLabel={(t) => t.name}
            getValue={(t) => t.id}
          />
          <LabeledTextField required name="name" placeholder="الاسم الاول" label="الاسم الاول" />
          <LabeledTextField required name="nickname" placeholder="اللقب" label="اللقب" />
          <LabeledTextField
            required
            name="mobile"
            type="number"
            label="الجوال"
            placeholder="الجوال"
          />
          <LabeledTextField
            required
            name="description"
            placeholder="المنازل الافضل في قطر"
            label="تفاصيل الاستفسار"
          />

          <SubmitButton fetching={fetching} />
        </Form>
      </Box>
    </Fade>
  )
}
