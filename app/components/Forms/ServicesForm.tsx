import LabeledMenuField from "app/admin/components/LabeledMenuField"
import React from "react"
import { Box, Button, Card, Grid, Heading } from "theme-ui"
import Form from "../Form"
import LabeledTextField from "../LabeledTextField"

function HotelsForm() {
  return (
    <Form onSubmit={console.log}>
      <LabeledTextField name="name" label="الاسم" />
      <LabeledTextField name="mobile" label="الجوال" />
      <LabeledTextField name="destination" label="الوجهة" />
      <Grid columns={2}>
        <LabeledTextField name="arrivalDate" label="تاريخ الوصول" />
        <LabeledTextField name="arrivalDate" label="مطار الوصول" />
      </Grid>
      <LabeledTextField name="departureDate" label="تاريخ المغادرة" />
      <LabeledMenuField
        name="guests"
        options={["1", "2", "3", "4", "5", "6", "+7"]}
        label="الزوار"
      />
      <Button>ارسال</Button>
    </Form>
  )
}

function TripButton({ children }) {
  return (
    <Box
      sx={{
        borderRadius: "md",
        backgroundColor: "primary",
        borderWidth: 3,
        paddingY: 2,
        paddingX: 3,
        textAlign: "center",
        color: "heading",
        borderColor: "white",
        borderStyle: "solid",
      }}
    >
      {children}
    </Box>
  )
}

export default function ServicesForm() {
  return (
    <Card
      sx={{
        maxWidth: 1000,
        borderRadius: "lg",
        boxShadow: "default",
        marginX: "auto",
        paddingX: 5,
        paddingTop: 5,
        backgroundColor: "primary",
      }}
    >
      <Grid sx={{ marginBottom: 5, alignItems: "center" }} columns={2}>
        <Heading sx={{ marginTop: 4, fontSize: 6, color: "white" }}>خطط لرحلتك</Heading>
        <Grid columns={3}>
          <TripButton>الطيران</TripButton>
          <TripButton>الفندق</TripButton>
          <TripButton>السيارة</TripButton>
        </Grid>
      </Grid>
      <HotelsForm />
    </Card>
  )
}
