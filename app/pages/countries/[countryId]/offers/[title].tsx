import React from "react"
import { BlitzPage, Link, useParam, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Grid, Heading, Image, Text, Link as ThemeLink } from "theme-ui"
import getOffer from "app/public/offers/queries/getOffer"
import ArrowIcon from "app/components/ArrowIcon"

function getString(item: any): string {
  if (typeof item === "string") return item

  return ""
}

const WhatsNew: BlitzPage = () => {
  const offerTitle = useParam("title", "string")
  const [offer] = useQuery(getOffer, { where: { title: offerTitle } })
  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={offerTitle}>
      <Box sx={{ py: 6, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          <Image src={offer.image} alt={offer.title} />
        </Wrapper>
        <Wrapper sx={{ paddingBottom: 5 }}>
          <Heading sx={{ fontSize: 6, fontWeight: 700 }}>{offer.title}</Heading>
          <Box dangerouslySetInnerHTML={{ __html: offer.reachText }} />
        </Wrapper>
      </Box>
      <Box sx={{ backgroundColor: "light", paddingY: 5 }}>
        <Wrapper>
          <Grid columns={2}>
            <Box sx={{ paddingX: 2 }}>
              <Image src={offer.project.image || ""} alt={offer.project.name} />
            </Box>
            <Box sx={{ paddingX: 2 }}>
              <Heading>{offer.project.name}</Heading>
              <Text>{offer.project.subTitle}</Text>

              <Box as="ul">
                {offer.project.features?.map((feat) => (
                  <Box as="li">{feat}</Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Link passHref href={`/countries/${offer.countryId}/projects/${offer.project.name}`}>
            <ThemeLink
              sx={{
                marginY: 4,
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-block",
              }}
            >
              <Box as="span" sx={{ paddingX: 5 }}>
                عرض المشروع
              </Box>
              <ArrowIcon />
            </ThemeLink>
          </Link>
          {offer.project.paymentType === "installment" &&
            Array.isArray(offer.project.installmentPlan) && (
              <Box
                sx={{
                  table: {
                    border: "1px solid white",
                    borderCollapse: "unset",
                    width: "100%",
                  },
                  th: {
                    backgroundColor: "primary",
                    color: "white",
                    paddingY: 1,
                    fontWeight: 700,
                    fontSize: 4,
                  },
                  td: {
                    p: 2,
                    textAlign: "center",
                  },
                  "th, td": {},
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>الأقساط</th>
                      <th>المرحلة</th>
                      <th>نسب الدفعات (٪)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offer.project.installmentPlan.map(
                      (plan: { instalment?: string; milestone?: string; payment?: string }) => (
                        <tr>
                          <td>{getString(plan?.instalment)}</td>
                          <td>{getString(plan?.milestone)}</td>
                          <td>{getString(plan?.payment)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </Box>
            )}
        </Wrapper>
      </Box>
    </Layout>
  )
}

export default WhatsNew
