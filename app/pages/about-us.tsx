import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Box, Heading, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"

const AboutusPage: BlitzPage = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 6, color: "primary" }}>عن مجموعة فايز احمد العقارية</Heading>
        </Wrapper>
      </Box>
      <Wrapper sx={{ paddingY: 5 }}>
        <Heading sx={{ mb: 2 }}>رؤيتنا</Heading>
        <Text>
          أن تكون مجموعة فايز أحمد العقارية الشركة الرائدة في التسويق والخدمات العقارية والجهة
          الموثوقة في مجال صناعة العقار
        </Text>

        <Heading sx={{ mt: 5, mb: 2 }}>رسالتنا</Heading>
        <Text>
          أن نلبي طموحات عملائنا والارتقاء بالسوق العقاري من خلال تقديم مشاريع عقارية مبتكرة ذات
          جودة عالية بما يوفر لعملائنا أساليب الحياة التي يطمحون إليها في مجتمعاتنا السكنية النابضة
          بالحياة
        </Text>

        <Heading sx={{ mt: 5, mb: 2 }}>قيمنا</Heading>
        <Text>الريادة.. الجودة.. رضاء العملاء.. الشفافية.. الثقة.. الابتكار</Text>

        <Heading sx={{ mt: 5, mb: 2 }}>هدفنا</Heading>
        <Text>فريق عمل واحد.. يمتلك حلماً واحداً.. وهدف واحد.. لنصنع قصة نجاح واحدة</Text>
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
