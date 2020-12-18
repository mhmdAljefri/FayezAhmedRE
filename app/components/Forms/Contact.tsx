import React from "react"
import { Box, Grid, Heading, Image } from "theme-ui"
import Form from "../Form"
import LabeledTextField from "../LabeledTextField"
import useRequestsMutation from "app/hooks/useRequestsMutation"
import SubmitButton from "../SubmitButton"
import Fade from "react-reveal/Fade"
import LabeledMenuField from "app/admin/components/LabeledMenuField"

export default function Contact() {
  const { run, fetching } = useRequestsMutation("consultings")

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
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            left: 50,
            padding: 3,
            width: [100, 150],
            height: [100, 150],
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
          <Grid
            columns={[1, null, 3]}
            sx={{ justifyContent: "space-between", alignItems: "flex-end" }}
          >
            <Grid columns={[1, null, 2]} sx={{ gridColumn: ["auto", null, "span 2"] }}>
              <LabeledMenuField
                label="وقت الاتصال (اختياري)"
                name="callingTime"
                options={[
                  { id: "9-12", name: "9-12am" },
                  { id: "12-3", name: "12-3am" },
                  { id: "3-6", name: "3-6am" },
                  { id: "6-9", name: "6-9am" },
                  { id: "now", name: "now" },
                ]}
                getLabel={(t) => t.name}
                getValue={(t) => t.id}
              />
              <LabeledMenuField
                label="الميزانية (اختياري)"
                name="budget"
                options={[
                  { id: "1 مليون", name: "مليون" },
                  { id: "2 مليون", name: "2 مليون" },
                  { id: "4 مليون", name: "4 مليون" },
                  { id: "اكثر من 4 مليون", name: "اكثر من 4 مليون" },
                ]}
                getLabel={(t) => t.name}
                getValue={(t) => t.id}
              />
            </Grid>
            <SubmitButton fetching={fetching} />
          </Grid>
        </Form>
      </Box>
    </Fade>
  )
}
