import { Prisma } from "@prisma/client"
import Filter, { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import getCountry from "app/public/countries/queries/getCountry"
import getProjectsInfinite from "app/public/projects/queries/getInfiniteProjects"
import { Link, useInfiniteQuery, useParam, useQuery, useRouter, useRouterQuery } from "blitz"
import React, { useRef, useState } from "react"
import { Button, Flex, Grid, Image, Box, Heading, Text } from "theme-ui"

import Icon, { IconProp } from "react-icons-kit"
import { building } from "react-icons-kit/fa/building"
import { money } from "react-icons-kit/fa/money"
import { dollar } from "react-icons-kit/fa/dollar"
import { ic_format_paint } from "react-icons-kit/md/ic_format_paint"
import { Project, RoomWithPrice } from "@prisma/client"
import usePriceType from "app/hooks/usePriceType"
import useOnClickout from "app/hooks/useOnClickout"
import FetchMoreButton from "app/components/FetchMoreButton"
import Fade from "react-reveal/Fade"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"

interface ProjectCardIconsTextProps extends IconProp {
  width?: number
  text: string
}

type ProjectCardProps = Pick<
  Project,
  "id" | "name" | "image" | "locationText" | "subTitle" | "paymentType"
> & {
  roomWithPrices: Pick<
    RoomWithPrice,
    | "room"
    | "price"
    | "priceKSA"
    | "priceKuwait"
    | "priceOman"
    | "priceQatar"
    | "priceTurkey"
    | "priceUAE"
    | "id"
  >[]
}

function ProjectCardIconsText({ icon, text, width }: ProjectCardIconsTextProps) {
  return (
    <Flex sx={{ marginBottom: 3, fontSize: 1, width, color: "lightText", whiteSpace: "nowrap" }}>
      <Icon icon={icon} />
      <span style={{ whiteSpace: "nowrap" }}>{text}</span>
    </Flex>
  )
}

function SelectRoom({ roomWithPrices, selected, onChange }) {
  const { open, setOpen, ref } = useOnClickout()

  if (!selected) return <div />
  return (
    <Box ref={ref} sx={{ position: "relative" }}>
      <Button sx={{ height: 40, padding: 0 }} variant="link" onClick={() => setOpen(true)}>
        <ProjectCardIconsText text={selected.room} icon={building} />
      </Button>

      {open && (
        <Box sx={{ position: "absolute", width: 80, boxShadow: "default" }}>
          {roomWithPrices.map((room) => (
            <div
              role="button"
              aria-label="select"
              tabIndex={0}
              onKeyDown={() => onChange(room)}
              onClick={() => onChange(room)}
            >
              <ProjectCardIconsText text={room.room} icon={building} />
            </div>
          ))}
        </Box>
      )}
    </Box>
  )
}

function ProjectCard({
  image,
  name,
  id,
  subTitle,
  locationText,
  paymentType,
  roomWithPrices,
}: ProjectCardProps) {
  const { priceType } = usePriceType()
  const [selected, setSelected] = useState(roomWithPrices[0])

  const price = selected?.[priceType]
  const projectPath = useRouter().asPath + `/${id}`
  return (
    <Fade bottom>
      <Box
        sx={{
          width: ["90vw", null, 370],
          backgroundColor: "white",
          marginX: "auto",
          boxShadow: "default",
          marginBottom: 2,
        }}
      >
        <Box sx={{}}>
          <Link passHref href={projectPath}>
            <a>
              <Image
                sx={{ height: 240, width: "100%", objectFit: "cover" }}
                src={image as string}
              />
            </a>
          </Link>
        </Box>
        <Box sx={{ paddingY: 3, paddingX: 3 }}>
          <Heading>{name}</Heading>
          <Text>{locationText}</Text>
          <Text>{subTitle}</Text>
        </Box>
        <Flex sx={{ paddingX: 3, justifyContent: "space-between" }}>
          <ProjectCardIconsText text={"جاهز"} icon={ic_format_paint} />
          <SelectRoom selected={selected} roomWithPrices={roomWithPrices} onChange={setSelected} />
          <ProjectCardIconsText text={paymentType === "cash" ? "كاش" : "تقسيط"} icon={money} />
          <ProjectCardIconsText text={`تبدا من ${price}`} icon={dollar} />
        </Flex>
      </Box>
    </Fade>
  )
}

type ProjectListTypes = {
  title: string
  subTitle: string
}

export default function ProjectsList({ title, subTitle }: ProjectListTypes) {
  const filter = useRouterQuery()
  const filterRef = useRef<filterValues>(filter)
  const countryId = parseInt(useParam("countryId") as string)
  const [country] = useQuery(getCountry, { where: { id: countryId } })
  const [{ propertyTypes }] = useQuery(getPropertyTypes, {})

  const [
    groupedProjects,
    { isFetching, refetch, fetchMore, canFetchMore, isFetchingMore },
  ] = useInfiniteQuery(
    getProjectsInfinite,
    (page = { take: 9, skip: 0 }) => ({
      ...page,
      where: {
        countryId,
        OR: [
          { name: { contains: filterRef.current?.search } },
          { subTitle: { contains: filterRef.current?.search } },
          { details: { contains: filterRef.current?.search } },
        ],
      },
    }),
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
    }
  )

  return (
    <div>
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 7,
          color: "white",
          backgroundColor: "dark",
          marginBottom: 4,
        }}
      >
        <Wrapper>
          <Heading as="h1" sx={{ fontSize: 7, color: "white" }}>
            {title}
          </Heading>
          <Text>{subTitle}</Text>
        </Wrapper>
      </Box>
      <Wrapper sx={{ marginTop: -7, marginBottom: 5 }}>
        <Filter
          propertyTypes={propertyTypes}
          initialValues={filter}
          isTurkey={country.isTurkey}
          rooms={country.rooms}
          cities={country.cities}
          onFilter={(data) => {
            filterRef.current = data
            refetch()
          }}
        />
      </Wrapper>
      <Box>
        <Wrapper>
          <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
            {groupedProjects.map((group, i) => (
              <React.Fragment key={i}>
                {group.projects.map((project) => (
                  <ProjectCard
                    {...project}
                    roomWithPrices={project.roomsWithPrices}
                    key={project.id}
                  />
                ))}
              </React.Fragment>
            ))}
          </Grid>

          <FetchMoreButton
            disabled={!canFetchMore || !!isFetchingMore}
            onClick={fetchMore}
            isFetchingMore={isFetchingMore || isFetching}
            canFetchMore={canFetchMore}
          />
        </Wrapper>
      </Box>
    </div>
  )
}
