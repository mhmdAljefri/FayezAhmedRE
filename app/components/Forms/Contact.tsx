import React, { useRef } from "react"
import { Box, Link as ThemeLink, Grid, Heading } from "theme-ui"
import Form from "../Form"
import LabeledTextField from "../LabeledTextField"
import useRequestsMutation from "app/hooks/useRequestsMutation"
import SubmitButton from "../SubmitButton"
import LabeledMenuField from "app/admin/components/LabeledMenuField"
import useScroll from "app/hooks/useScroll"
import OptmizationImage from "../OptmizationImage"

export default function Contact() {
  const { run, fetching } = useRequestsMutation("consultings")
  const formRef = useRef<HTMLDivElement>(null)

  const top = formRef.current?.getBoundingClientRect().top || 0
  const offsetHeight = formRef.current?.offsetHeight || 0
  const visiable = top <= offsetHeight

  useScroll() // update component on scroll (rerender)

  return (
    <Box
      sx={{
        paddingY: 4,
      }}
      id="Contact"
    >
      <Box
        ref={formRef}
        sx={{
          maxWidth: 900,
          marginX: "auto",
          backgroundColor: "primary",
          borderRadius: "lg",
          boxShadow: "default",
          position: visiable ? "relative" : "static",
          paddingX: 4,
        }}
      >
        <ThemeLink
          href="#Contact"
          sx={{
            position: visiable ? "absolute" : "fixed",
            zIndex: "contactForm",
            top: visiable ? -50 : "auto",
            left: 50,
            bottom: visiable ? "auto" : [80, null, 100],
            padding: [2, 3],
            width: visiable ? [100, 150] : [80, 100],
            height: visiable ? [100, 150] : [80, 100],
            boxShadow: "default",
            backgroundColor: visiable ? "background" : "white100",
            borderRadius: 1000,
          }}
        >
          <OptmizationImage
            layout="intrinsic"
            width={150}
            height={150}
            localImage
            objectFit="contain"
            src="/icons/icons8_headset_128px.png"
            alt="اطلب استشارتك"
          />
        </ThemeLink>
        <Heading sx={{ fontSize: [4, 6], paddingTop: 5, paddingBottom: 4, color: "white" }}>
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
            placeholder="المنازل الافضل في قطر"
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
              <LabeledTextField label="الميزانية (اختياري)" name="budget" />
            </Grid>
            <SubmitButton fetching={fetching} />
          </Grid>
        </Form>
      </Box>
    </Box>
  )
}
