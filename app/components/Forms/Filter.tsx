import React from "react"
import { Field } from "react-final-form"
import { Icon } from "react-icons-kit"
import { Box, Button, Grid, Heading, Input, Label, Slider } from "theme-ui"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"
import Form from "../Form"
import { MenuField } from "app/admin/components/LabeledMenuField"

export default function Filter({ cities, rooms }) {
  return (
    <Box
      sx={{
        backgroundColor: "primary",
        borderRadius: "lg",
        boxShadow: "default",
        paddingX: 4,
        paddingBottom: 5,
      }}
    >
      <Heading sx={{ fontSize: 6, paddingY: 5, color: "white" }}>فلتر</Heading>
      <Form onSubmit={() => {}}>
        <Grid columns={[1, null, 3]}>
          <Field required name="search" component={Input} placeholder="البحث" />
          <MenuField
            getLabel={(i) => i.name}
            getValue={(i) => i.id}
            options={[{ name: "المدينة", id: "" }, ...cities]}
            name="city"
          />

          <Field required name="description" component={Input} placeholder="بيع" />
        </Grid>

        <Grid columns={[1, null, 3]}>
          <MenuField options={["نوع الغرفة", ...rooms]} name="room" />
          <Box>
            <Label>السعر</Label>
            <Field name="price" sx={{ backgroundColor: "white" }} component={Slider} />
          </Box>
          <MenuField
            name="status"
            getLabel={(i) => i.name}
            getValue={(i) => i.id}
            options={[
              { id: "completed", name: "مكتمل" },
              { id: "inprogress", name: "قيد التطوير" },
            ]}
          />
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
      </Form>
    </Box>
  )
}
