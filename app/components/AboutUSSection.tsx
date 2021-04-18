import React from "react"
import { Box, Grid, Heading, SxStyleProp, Text } from "theme-ui"

function Card({
  heading,
  text,
  layerBackgroundColor,
  headingColor = "primary",
  darkColor = false,
}) {
  return (
    <Box
      className="animate__animated animate__fadeInUp"
      sx={{
        ...styles.boxStyle,
        ":before": {
          ...styles.before,
          backgroundColor: layerBackgroundColor,
        },
      }}
    >
      <Heading sx={{ ...styles.headingStyle, color: darkColor ? "black" : headingColor }}>
        {heading}
      </Heading>
      <Text
        sx={{
          position: "relative",
          zIndex: 1,
          fontSize: 1,
          fontWeight: 600,
          textShadow: (t) => `0 2px 5px ${t.colors.text}`,
          color: darkColor ? "black" : "white",
        }}
      >
        {text}
      </Text>
    </Box>
  )
}
export default function AboutUSSection() {
  return (
    <Grid gap={0} columns={[1, 1, 3]}>
      <Card
        heading={"الرؤية"}
        headingColor="white"
        text="  أن تكون مجموعة فايز أحمد العقارية الشركة الرائدة في التسويق والخدمات العقارية والجهة
      الموثوقة في مجال صناعة العقار"
        layerBackgroundColor="primary100"
      />
      <Card
        heading={"الرسالة"}
        text="أن نلبي طموحات عملائنا والارتقاء بالسوق العقاري من خلال تقديم مشاريع عقارية مبتكرة ذات
      جودة عالية بما يوفر لعملائنا أساليب الحياة التي يطمحون إليها في مجتمعاتنا السكنية النابضة
      بالحياة"
        layerBackgroundColor="black100"
      />
      <Card
        heading={"الهدف"}
        text="فريق عمل واحد.. يمتلك حلماً واحداً.. وهدف واحد.. لنصنع قصة نجاح واحدة"
        layerBackgroundColor="secondary100"
      />
    </Grid>
  )
}
// primary100
// white100
// black100
// secondary100
const styles: { headingStyle: SxStyleProp; boxStyle: SxStyleProp; before: SxStyleProp } = {
  boxStyle: { p: [3, 4], backgroundImage: "url(sky.jpg)", position: "relative" },
  headingStyle: { mt: 2, mb: 2, position: "relative", zIndex: 1 },
  before: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
}
