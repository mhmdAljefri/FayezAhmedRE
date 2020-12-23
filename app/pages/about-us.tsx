import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Box, Heading, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"

const AboutusPage: BlitzPage = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 6, color: "primary" }}>عن مجموعة فائز احمد العقارية</Heading>
        </Wrapper>
      </Box>
      <Wrapper sx={{ paddingY: 5 }}>
        <Heading sx={{ mb: 2 }}>الرؤية</Heading>
        <Text>أن تكون مجموعة فايز أحمد العقارية الأكثر تميزا وإدراكا في صناعة وبيع العقار</Text>

        <Heading sx={{ mt: 5, mb: 2 }}>الرسالة</Heading>
        <Text>
          أن نسوق مشاريع عقارية مبتكرة ذات جودة عالية بما يوفر لعملائنا أساليب الحياة التي يطمحون
          إليها في مجتمعاتنا السكنية النابضة بالحياة
        </Text>

        <Heading sx={{ mt: 5, mb: 2 }}>القيم</Heading>
        <Text>الريادة.. الجودة.. رضاء العملاء.. الشفافية.. الثقة.. الابتكار</Text>
      </Wrapper>
    </>
  )
}

AboutusPage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="الاستفسارات">
    {page}
  </Layout>
)

export default AboutusPage
