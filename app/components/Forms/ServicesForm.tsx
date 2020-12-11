import LabeledMenuField from "app/admin/components/LabeledMenuField"
import React, { useState } from "react"
import { Box, Card, Grid, Heading } from "theme-ui"
import Form from "../Form"
import SubmitButton from "../SubmitButton"
import LabeledTextField from "../LabeledTextField"
import useRequestsMutation from "app/hooks/useRequestsMutation"
import { useParam, useQuery } from "blitz"
import getCities from "app/public/cities/queries/getCities"

function Destination() {
  const countryId = useParam("countryId", "number")
  const [{ cities }] = useQuery(getCities, { where: { countryId } })
  return (
    <LabeledMenuField
      options={cities}
      getLabel={(t) => t.name}
      getValue={(t) => t.name}
      name="destination"
      label="الوجهة"
    />
  )
}

function FlightsForm() {
  const { run, fetching } = useRequestsMutation("flights")

  return (
    <Form onSubmit={run}>
      <LabeledTextField required name="name" label="الاسم" />
      <LabeledTextField required name="mobile" label="الجوال" />
      <Destination />
      <Grid columns={2}>
        <LabeledTextField required name="arrivalDate" label="تاريخ الوصول" />
        <LabeledTextField required name="arrivalAirport" label="مطار الوصول" />
      </Grid>
      <Grid columns={2}>
        <LabeledTextField required name="departureDate" label="تاريخ المغادرة" />
        <LabeledTextField required name="departureAirport" label="مطار المغادرة" />
      </Grid>
      <LabeledMenuField
        name="guests"
        options={["1", "2", "3", "4", "5", "6", "+7"]}
        label="المسافرون"
      />
      <SubmitButton fetching={fetching} />
    </Form>
  )
}
function HotelsForm() {
  const { run, fetching } = useRequestsMutation("hotels")

  return (
    <Form onSubmit={run}>
      <LabeledTextField required name="name" label="الاسم" />
      <LabeledTextField required name="mobile" label="الجوال" />
      <Destination />
      <LabeledTextField required name="arrivalDate" label="تاريخ الوصول" />
      <LabeledTextField required name="departureDate" label="تاريخ المغادرة" />
      <LabeledTextField required name="count" label="الأشغال" />
      <SubmitButton fetching={fetching} />
    </Form>
  )
}
function CarsForm() {
  const { run, fetching } = useRequestsMutation("cars")
  return (
    <Form onSubmit={run}>
      <LabeledTextField required name="name" label="الاسم" />
      <LabeledTextField required name="mobile" label="الجوال" />
      <LabeledTextField required name="count" type="number" label="عدد الركاب" />
      <LabeledTextField required name="arrivalDate" label="من تاريخ" />
      <LabeledTextField required name="departureDate" label="الى تاريخ" />
      <SubmitButton fetching={fetching} />
    </Form>
  )
}

function TripButton({ children, isSelected, onClick }) {
  return (
    <Box
      onClick={onClick}
      role="button"
      aria-label={children}
      sx={{
        cursor: "pointer",
        borderRadius: "md",
        backgroundColor: isSelected ? "white" : "primary",
        borderWidth: 3,
        paddingY: 2,
        paddingX: 3,
        fontWeight: "700",
        textAlign: "center",
        color: isSelected ? "primary" : "heading",
        borderColor: "white",
        borderStyle: "solid",
      }}
    >
      {children}
    </Box>
  )
}

const HOTELS = { id: "hotels", name: "الفنادق", render: () => <HotelsForm /> }
const CARS = { id: "cars", name: "السيارات", render: () => <CarsForm /> }
const FLIGHTS = { id: "flights", name: "الطيران", render: () => <FlightsForm /> }
const OPTIONS = [FLIGHTS, HOTELS, CARS]

export default function ServicesForm() {
  const [selected, setSelected] = useState(OPTIONS[0])

  return (
    <Card
      sx={{
        maxWidth: 1000,
        borderRadius: "lg",
        boxShadow: "default",
        marginX: "auto",
        paddingX: 5,
        paddingBottom: 3,
        paddingTop: 5,
        backgroundColor: "primary",
      }}
    >
      <Grid sx={{ marginBottom: 5, alignItems: "center" }} columns={[1, null, 2]}>
        <Heading sx={{ marginTop: 4, fontSize: 6, color: "white" }}>خطط لرحلتك معنا</Heading>
        <Grid columns={[1, null, 3]}>
          {OPTIONS.map((option) => (
            <TripButton
              isSelected={selected.id === option.id}
              key={option.id}
              onClick={() => setSelected(option)}
            >
              {option.name}
            </TripButton>
          ))}
        </Grid>
      </Grid>
      {selected.render()}
    </Card>
  )
}
