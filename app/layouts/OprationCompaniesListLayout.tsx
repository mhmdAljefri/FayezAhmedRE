import { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import { Link, usePaginatedQuery, useParam, useRouter, useRouterQuery } from "blitz"
import React, { useRef } from "react"
import { Grid, Image, Box, Heading, Text } from "theme-ui"

import FetchMoreButton from "app/components/FetchMoreButton"
import Fade from "react-reveal/Fade"
import getOprationCompanyPages from "app/public/oprationCompanyPages/queries/getOprationCompanyPages"
import { OprationCompanyPage } from "@prisma/client"
import HTMLBox from "app/components/HTMLBox"

type CompaniesCardProps = Pick<OprationCompanyPage, "id" | "title" | "image" | "description"> & {
  prefixPath?: string
  hideCompaniesLabel?: boolean
}

export function CompaniesCard({
  image,
  hideCompaniesLabel,
  description,
  id,
  title,
  prefixPath = "",
}: CompaniesCardProps) {
  const { asPath } = useRouter()
  return (
    <Fade bottom>
      <Box
        sx={{
          width: ["90vw", null, 370],
          backgroundColor: "background",
          marginX: "auto",
          boxShadow: "default",
          marginBottom: 2,
        }}
      >
        <Link href={asPath + "/" + prefixPath + id}>
          <a>
            <Box sx={{ position: "relative" }}>
              <Image
                sx={{
                  height: 240,
                  width: "100%",
                  objectFit: "cover",
                  ":hover + div": {
                    backgroundColor: "primary",
                  },
                }}
                src={image as string}
              />
              {!hideCompaniesLabel && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    textAlign: "center",
                    left: 0,
                    right: 0,
                    lineHeight: "40px",
                    height: 40,
                    backgroundColor: "dark",
                    color: "white",
                    transition: "all 0.5s linear",
                    ":hover": {
                      backgroundColor: "primary",
                    },
                  }}
                >
                  العرض الحالي
                </Box>
              )}
            </Box>
          </a>
        </Link>
        <Box sx={{ paddingY: 3, paddingX: 3 }}>
          <Heading>{title}</Heading>
          <HTMLBox html={description} />
        </Box>
      </Box>
    </Fade>
  )
}

type ListProps = Pick<OprationCompanyPage, "title" | "description">
export default function OprationCompaniesListLayout({ title, description }: ListProps) {
  const countryId = parseInt(useParam("countryId") as string)
  const [{ oprationCompanyPages }] = usePaginatedQuery(getOprationCompanyPages, {
    where: { countryId },
  })

  return (
    <div>
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 7,
          color: "background",
          backgroundColor: "dark",
          marginBottom: 4,
        }}
      >
        <Wrapper>
          <Heading as="h1" sx={{ fontSize: 7, color: "background" }}>
            {title}
          </Heading>
          <Text>{description}</Text>
        </Wrapper>
      </Box>
      <Box>
        <Wrapper>
          <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
            {oprationCompanyPages.map((offer) => (
              <CompaniesCard hideCompaniesLabel {...offer} key={offer.id} />
            ))}
          </Grid>
        </Wrapper>
      </Box>
    </div>
  )
}
