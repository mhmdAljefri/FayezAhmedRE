import React from "react"
import { Field } from "react-final-form"
import { Icon } from "react-icons-kit"
import { Box, Button, Grid, Heading, Input, Select } from "theme-ui"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"
import Form from "../Form"

export default function Contact() {
  return (
    <Box
      sx={{
        maxWidth: 1000,
        marginX: "auto",
        backgroundColor: "primary",
        borderRadius: "lg",
        boxShadow: "default",
        paddingX: 4,
      }}
    >
      <Heading sx={{ fontSize: 6, paddingTop: 5, paddingBottom: 4, color: "white" }}>
        اطلب استشارتك
      </Heading>
      <Form onSubmit={() => {}}>
        <Field required name="name" component={Input} placeholder="الاسم واللقب" />
        <Field required name="mobile" component={Input} type="number" placeholder="الجوال" />
        <Field
          required
          name="description"
          component={Input}
          placeholder="المنازل الافضل في قطر وتركيا"
        />
        <Grid columns={[1, null, 3]} sx={{ justifyContent: "space-between" }}>
          <Grid columns={[1, null, 2]} sx={{ gridColumn: ["auto", null, "span 2"] }}>
            <Field sx={{ minWidth: 250 }} component={Select} name="time">
              <option>وقت الاتصال (إختياري)</option>
              <option value="9-12">9-12am</option>
              <option value="12-3">12-3pm</option>
              <option value="3-6">3-6pm</option>
              <option value="6-9">6-9pm</option>
              <option value="anytime">اي وقت</option>
              <option value="now">الان</option>
            </Field>
            <Field sx={{ minWidth: 250 }} component={Select} name="budget">
              <option>الميزانية (إختياري)</option>
              <option value="9-12">9-12am</option>
              <option value="12-3">12-3pm</option>
              <option value="3-6">3-6pm</option>
              <option value="6-9">6-9pm</option>
              <option value="anytime">اي وقت</option>
              <option value="now">الان</option>
            </Field>
          </Grid>

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
        </Grid>
      </Form>
    </Box>
  )
}
