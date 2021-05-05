import React from "react"
import { Field } from "react-final-form"
import { Box, Flex, Grid, Heading, Input, Label } from "theme-ui"
import Form from "../Form"
import { MenuField } from "app/admin/components/LabeledMenuField"
import SubmitButton from "../SubmitButton"
import DomainSlider from "../DomainSlider"
import { City, Country, PropertyType, Purpose } from "@prisma/client"
import { PROJECT_STATUS, PRICE_RANG, PRICE_RANG_QATAR } from "app/constants"
import useOnClickout from "app/hooks/useOnClickout"
import useScreenSize from "app/hooks/useScreenSize"
import Burger from "../Burger"
import { getListOfPrice } from "app/utils"

export type filterValues = {
  search?: string
  city?: string
  type?: string
  price?: number[]
  room?: number[] | string[]
  rooms?: number[] | string[] // progrmatically add on submit
  propertyType?: string
  purpose?: string
  status?: string
  isHousingComplex?: "true" | "false"
  isGrantedByGov?: "true" | "false"
  isWithSeaView?: "true" | "false"
  isDelux?: "true" | "false"
}
type filterProps = Pick<Country, "isTurkey" | "rooms"> & {
  onFilter: (filter: filterValues) => any
  initialValues?: filterValues
  cities: City[]
  propertyTypes: PropertyType[]
  purposes: Purpose[]
}

export default function Filter({
  cities,
  propertyTypes,
  initialValues,
  rooms,
  isTurkey,
  purposes,
  onFilter,
}: filterProps) {
  const { open, setOpen, ref } = useOnClickout()
  const screenSize = useScreenSize()
  const isSmall = screenSize <= 800

  if (!rooms) return null

  const sortedRooms = isTurkey ? [] : rooms?.map((item) => parseInt(item, 10)).sort((a, b) => a - b)

  // handlers
  const handleSubmit = (data) => {
    const listofPrices = getListOfPrice(data.price) // wtf
    const roomsRange = getRoomsRange(data.room, sortedRooms)

    const newData = {
      ...data,
      price: listofPrices,
      rooms: roomsRange,
    }

    onFilter(newData)
  }

  return (
    <Box
      className="animate__animated animate__fadeInUp animate__slow"
      sx={{
        backgroundColor: "primary",
        maxWidth: 950,
        marginX: "auto",
        borderRadius: "lg",
        boxShadow: "default",
        paddingX: [2, 4],
        paddingBottom: open ? 5 : 0,
      }}
      ref={ref}
    >
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Heading sx={{ fontSize: [4, 4, 5, 6], paddingY: 4, color: "white" }}>البحث</Heading>
        {isSmall && (
          <Burger
            onClosedColor="heading"
            onOpenedColor="heading"
            onClick={() => setOpen(!open)}
            open={open}
          />
        )}
      </Flex>

      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <Box sx={{ display: isSmall && !open ? "none" : "block" }}>
          <Grid columns={[1, null, 3]}>
            <Field
              required
              name="search"
              component={({ input }) => <Input placeholder="البحث" {...input} />}
              sx={{ borderColor: "primary" }}
            />
            <MenuField
              getLabel={(i) => i.name}
              getValue={(i) => i.id}
              options={cities || []}
              emptyOptionText="المدينة"
              name="city"
            />
            <MenuField
              getLabel={(i) => i.name}
              getValue={(i) => i.id}
              options={purposes || []}
              emptyOptionText="الغرض"
              name="purpose"
            />
          </Grid>
          <Grid
            sx={{ marginBottom: 3, marginTop: 3, alignItems: "center" }}
            columns={[1, 1, isTurkey ? 4 : 3]}
          >
            {isTurkey ? (
              <Box sx={{ gridColumn: ["auto", null, "span 2"] }}>
                <MenuField emptyOptionText="غرف النوم" options={[...rooms]} name="room" />
              </Box>
            ) : (
              <Box sx={{ marginTop: [1, null, -2], marginBottom: 4 }}>
                <Label sx={{ color: "white" }}>غرف النوم</Label>
                <Field
                  name="room"
                  sx={{ backgroundColor: "white" }}
                  defaultValue={[sortedRooms[0], sortedRooms[sortedRooms.length - 1]].reverse()}
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
            <MenuField
              emptyOptionText="السعر بالريال القطري"
              getLabel={(i) => i.name}
              getValue={(i) => i.id}
              options={isTurkey ? PRICE_RANG : PRICE_RANG_QATAR}
              name="price"
            />
            <MenuField
              name="propertyType"
              getLabel={(i) => i.name}
              getValue={(i) => i.id}
              emptyOptionText="نوع العقار"
              options={propertyTypes}
            />
          </Grid>

          <Flex sx={{ justifyContent: "center", flexWrap: ["wrap", "nowrap"], marginTop: 3 }}>
            <MenuField
              sx={{ width: 200, marginX: 2 }}
              name="status"
              getLabel={(i) => i.name}
              getValue={(i) => i.id}
              emptyOptionText="حالات المشروع"
              options={PROJECT_STATUS}
            />

            <SubmitButton sx={{ width: 200, marginX: 2 }} fetching={false} />
          </Flex>
        </Box>
      </Form>
    </Box>
  )
}

const getRoomsRange = (filterRooms: number[], dbRooms: number[]) => {
  // array revers from domain comp..
  const startIndex = dbRooms.findIndex((i) => i === filterRooms[1])
  const endIndex = dbRooms.findIndex((i) => i === filterRooms[0])

  const filteredRooms = dbRooms.slice(startIndex, endIndex + 1)

  return filteredRooms
}
