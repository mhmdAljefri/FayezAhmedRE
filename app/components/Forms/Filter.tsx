import React from "react"
import { Field } from "react-final-form"
import { Box, Flex, Grid, Heading, Input, Label } from "theme-ui"
import Form from "../Form"
import { MenuField } from "app/admin/components/LabeledMenuField"
import SubmitButton from "../SubmitButton"
import DomainSlider from "../DomainSlider"
import Slide from "react-reveal/Slide"
import { City, Country } from "@prisma/client"

export type filterValues = {
  search?: string
  city?: string
  type?: string
  price?: number[] | string[]
  room?: number[] | string[]
  propertyType?: string
  status?: string
}
type filterProps = Pick<Country, "isTurkey" | "rooms"> & {
  onFilter: (filter: filterValues) => any
  initialValues?: filterValues
  cities: City[]
}

export default function Filter({ cities, initialValues, rooms, isTurkey, onFilter }: filterProps) {
  const sortedRooms = isTurkey ? [] : rooms?.map((item) => parseInt(item)).sort()
  if (!rooms) return null
  return (
    <Slide bottom>
      <Box
        sx={{
          backgroundColor: "primary",
          borderRadius: "lg",
          boxShadow: "default",
          paddingX: 4,
          paddingBottom: 5,
        }}
      >
        <Heading sx={{ fontSize: 6, paddingY: 4, color: "white" }}>فلتر</Heading>
        <Form initialValues={initialValues} onSubmit={onFilter}>
          <Grid columns={[1, null, 3]}>
            <Field
              required
              name="search"
              component={({ input }) => <Input {...input} />}
              sx={{ borderColor: "primary" }}
              placeholder="البحث"
            />
            <MenuField
              getLabel={(i) => i.name}
              getValue={(i) => i.id}
              options={[...cities]}
              name="city"
            />

            <Field
              disabled
              required
              name="type"
              initialValue="بيع"
              component={({ input }) => <Input disabled {...input} />}
              placeholder="بيع"
            />
          </Grid>

          <Grid
            sx={{ marginBottom: 3, marginTop: 3, alignItems: "center" }}
            columns={[1, null, isTurkey ? 4 : 3]}
          >
            {isTurkey ? (
              <Box sx={{ gridColumn: "span 2" }}>
                <MenuField emptyOptionText="غرف النوم" options={[...rooms]} name="room" />
              </Box>
            ) : (
              <Box sx={{ marginTop: [1, null, -4], marginBottom: 4 }}>
                <Label sx={{ color: "white" }}>غرف النوم</Label>
                <Field
                  name="room"
                  sx={{ backgroundColor: "white" }}
                  defaultValue={[sortedRooms[0], sortedRooms[sortedRooms.length - 1]]}
                  render={({ input }) => (
                    <DomainSlider
                      {...input}
                      values={input.value}
                      domain={[sortedRooms[0], sortedRooms[sortedRooms.length - 1]]}
                    />
                  )}
                />
              </Box>
            )}
            <Box sx={{ marginTop: [1, null, -4], marginBottom: 4 }}>
              <Label sx={{ color: "white" }}>السعر</Label>
              <Field
                name="price"
                sx={{ backgroundColor: "white" }}
                defaultValue={[1, 50]}
                render={({ input }) => (
                  <DomainSlider {...input} values={input.value} domain={[1, 60]} />
                )}
              />
            </Box>
            <MenuField
              name="propertyType"
              getLabel={(i) => i.name}
              getValue={(i) => i.id}
              emptyOptionText="نوع المبنى"
              options={[
                { id: "completed", name: "شقق فندقية" },
                { id: "inprogress", name: "مكاتب" },
                { id: "inprogress", name: "فلل" },
              ]}
            />
          </Grid>
          <Flex sx={{ justifyContent: "center", flexWrap: ["wrap", null, "nowrap"], marginTop: 3 }}>
            <MenuField
              sx={{ width: 200, marginX: 2 }}
              name="status"
              getLabel={(i) => i.name}
              getValue={(i) => i.id}
              emptyOptionText="الكل"
              options={[
                { id: "completed", name: "مكتمل" },
                { id: "inprogress", name: "قيد التطوير" },
              ]}
            />

            <SubmitButton sx={{ width: 200, marginX: 2 }} fetching={false} />
          </Flex>
        </Form>
      </Box>
    </Slide>
  )
}
