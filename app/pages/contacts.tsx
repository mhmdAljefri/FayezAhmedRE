import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Box, Flex, Grid, Heading, Link, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import getContacts from "app/public/contacts/queries/getContacts"
import GoogleMap from "app/components/GoogleMap"
import { Contact } from "@prisma/client"
import { Icon } from "react-icons-kit"
import { mobile } from "react-icons-kit/fa/mobile"
import { phone } from "react-icons-kit/fa/phone"

type ContactsPageProps = {
  contacts: Contact[]
}
const ContactsPage: BlitzPage<ContactsPageProps> = ({ contacts }) => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 6, color: "primary" }}>جهات الاتصال</Heading>
        </Wrapper>
      </Box>
      <Wrapper>
        <Grid columns={[1, 2]}>
          {contacts.map((contact) => {
            const center: { lat: number; lng: number } = contact.locationObject as any
            return (
              <Box key={contact.id} sx={{ marginBottom: 5 }}>
                <Heading
                  sx={{ color: "primary", fontSize: 5, paddingBottom: 3, marginTop: 5 }}
                  as="h3"
                >
                  {contact.name}
                </Heading>
                <Box
                  sx={{ height: 2, backgroundColor: "primary", maxWidth: 200, marginBottom: 3 }}
                ></Box>
                <Text sx={{ fontSize: 3, marginBottom: 3 }}>{contact.location}</Text>
                <Flex>
                  <Box
                    sx={{
                      backgroundColor: "primary",
                      width: 38,
                      height: 38,
                      color: "white",
                      padding: 1,
                      borderRadius: 555,
                    }}
                  >
                    <Icon size={30} icon={mobile} />
                  </Box>
                  <Box sx={{ marginX: 3 }}>
                    {contact.mobiles.map((number) => (
                      <Box key={number}>
                        <Link sx={{ textDecoration: "none" }} href={"tel:" + number}>
                          {number}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Flex>
                <Flex sx={{ marginY: 3, alignItems: "center" }}>
                  <Box
                    sx={{
                      backgroundColor: "primary",
                      width: 38,
                      height: 38,
                      color: "white",
                      padding: 1,
                      borderRadius: 555,
                    }}
                  >
                    <Icon size={30} icon={phone} />
                  </Box>
                  <Box sx={{ marginX: 3 }}>
                    {contact.phones.map((phone) => (
                      <Box key={phone}>
                        <Link sx={{ textDecoration: "none" }} href={"tel:" + phone}>
                          {phone}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Flex>
                <GoogleMap center={center} />
              </Box>
            )
          })}
        </Grid>
      </Wrapper>
    </>
  )
}

export async function getStaticProps(context) {
  const { contacts } = await getContacts({})

  return {
    props: { contacts }, // will be passed to the page component as props
    revalidate: 60 * 30,
  }
}

ContactsPage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="جهات الاتصال">
    {page}
  </Layout>
)

export default ContactsPage
