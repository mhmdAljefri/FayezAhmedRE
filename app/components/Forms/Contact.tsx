import React from "react"
import { Field } from "react-final-form"
import { Box, Grid, Heading, Image, Select } from "theme-ui"
import Form from "../Form"
import LabeledTextField from "../LabeledTextField"
import useRequestsMutation from "app/hooks/useRequestsMutation"
import SubmitButton from "../SubmitButton"
import Fade from "react-reveal/Fade"

export default function Contact() {
  const { run, fetching } = useRequestsMutation("consultings")

  return (
    <Fade bottom>
      <Box
        sx={{
          maxWidth: 1000,
          marginX: "auto",
          backgroundColor: "primary",
          borderRadius: "lg",
          boxShadow: "default",
          position: "relative",
          paddingX: 4,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            left: 50,
            padding: 3,
            width: 150,
            height: 150,
            backgroundColor: "background",
            borderRadius: 1000,
          }}
        >
          <Image
            sx={{ objectFit: "contain" }}
            src="/icons/icons8_headset_128px.png"
            alt="اطلب استشارتك"
          />
        </Box>
        <Heading sx={{ fontSize: 6, paddingTop: 5, paddingBottom: 4, color: "white" }}>
          اطلب استشارتك
        </Heading>
        <Form onSubmit={run}>
          <LabeledTextField required name="name" placeholder="الاسم واللقب" label="الاسم واللقب" />
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
            placeholder="المنازل الافضل في قطر وتركيا"
            label="تفاصيل الاستشارة"
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
                <option value="9-12"></option>
                <option value="12-3">12-3pm</option>
                <option value="3-6">3-6pm</option>
                <option value="6-9">6-9pm</option>
                <option value="anytime">اي وقت</option>
                <option value="now">الان</option>
              </Field>
            </Grid>
            <SubmitButton fetching={fetching} />
          </Grid>
        </Form>
      </Box>
    </Fade>
  )
}
