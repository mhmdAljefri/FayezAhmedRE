import React from "react"
import { Field } from "react-final-form"
import { Icon } from "react-icons-kit"
import { Box, Button, Flex, Heading, Input, Select, Textarea } from "theme-ui"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"
import Form from "../Form"

export default function Contact() {
  return (
    <Box
      sx={{
        backgroundColor: "primary",
        borderRadius: "lg",
        boxShadow: "default",
        paddingX: 4,
      }}
    >
      <Heading sx={{ fontSize: 6, paddingY: 5, color: "white" }}>اطلب استشارتك</Heading>
      <Form onSubmit={() => {}}>
        <Field required name="name" component={Input} placeholder="الاسم واللقب" />
        <Field required name="mobile" component={Input} type="number" placeholder="الجوال" />
        <Field
          required
          name="description"
          component={Textarea}
          type="number"
          placeholder="الجوال"
        />
        <Flex sx={{ justifyContent: "space-between" }}>
          <Flex>
            <Field sx={{ minWidth: 250 }} component={Select} name="time">
              <option>وقت الاتصال (إختياري)</option>
              <option value="9-12">9-12am</option>
              <option value="12-3">12-3pm</option>
              <option value="3-6">3-6pm</option>
              <option value="6-9">6-9pm</option>
              <option value="anytime">اي وقت</option>
              <option value="now">الان</option>
            </Field>
            <Field sx={{ minWidth: 250, marginRight: 20 }} component={Select} name="budget">
              <option>الميزانية (إختياري)</option>
              <option value="9-12">9-12am</option>
              <option value="12-3">12-3pm</option>
              <option value="3-6">3-6pm</option>
              <option value="6-9">6-9pm</option>
              <option value="anytime">اي وقت</option>
              <option value="now">الان</option>
            </Field>
          </Flex>

          <Button
            sx={{
              variant: "forms.field",
              display: "flex",
              backgroundColor: "white",
              justifyContent: "space-between",
              color: "primary",
              borderRadius: "md",
              minWidth: 120,
            }}
          >
            إرسال <Icon icon={arrowLeft} />
          </Button>
        </Flex>
      </Form>
    </Box>
  )
}
