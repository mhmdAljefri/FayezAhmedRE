import Filter, { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import getCountry from "app/public/countries/queries/getCountry"
import getProjectsInfinite from "app/public/projects/queries/getInfiniteProjects"
import { Link, useInfiniteQuery, useParam, useQuery, useRouterQuery } from "blitz"
import React, { ReactNode, useRef, useState } from "react"
import { Button, Flex, Grid, Image, Box, Heading, Text } from "theme-ui"

import Icon, { IconProp } from "react-icons-kit"
import { building } from "react-icons-kit/fa/building"
import { money } from "react-icons-kit/fa/money"
import { chevronDown } from "react-icons-kit/fa/chevronDown"
import { ic_format_paint } from "react-icons-kit/md/ic_format_paint"
import { Project, RoomWithPrice } from "@prisma/client"
import usePriceType from "app/hooks/usePriceType"
import useOnClickout from "app/hooks/useOnClickout"
import FetchMoreButton from "app/components/FetchMoreButton"
import Fade from "react-reveal/Fade"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import { TURKEY_PROJECT_STATUS } from "app/constants"

interface ProjectCardIconsTextProps {
  width?: number
  text: string
  icon?: IconProp["icon"]
  prefix?: ReactNode
}

type ProjectCardProps = Pick<
  Project,
  "id" | "name" | "image" | "locationText" | "subTitle" | "paymentType" | "countryId" | "status"
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

function ProjectCardIconsText({ prefix, icon, text, width }: ProjectCardIconsTextProps) {
  return (
    <Flex sx={{ marginBottom: 3, fontSize: 1, width, color: "lightText", whiteSpace: "nowrap" }}>
      {icon && <Icon icon={icon} />}

      {prefix && <span style={{ whiteSpace: "nowrap", paddingInlineStart: 10 }}>{prefix}</span>}
      <span style={{ whiteSpace: "nowrap", paddingInlineStart: 10 }}>{text}</span>
    </Flex>
  )
}

function SelectRoom({ roomWithPrices, selected, onChange }) {
  const { open, setOpen, ref } = useOnClickout()

  if (!selected) return <div />
  return (
    <Box ref={ref} sx={{ position: "relative" }}>
      <Button
        sx={{ height: 40, padding: 0, display: "flex" }}
        variant="link"
        onClick={() => setOpen(true)}
      >
        <ProjectCardIconsText text={selected.room} icon={building} />
        <Box sx={{ marginX: 1 }}>
          <Icon size={12} icon={chevronDown} />
        </Box>
      </Button>

      {open && (
        <Box
          sx={{
            position: "absolute",
            boxShadow: "default",
            backgroundColor: "background",
          }}
        >
          {roomWithPrices.map((roomWithPrice) => (
            <Box
              role="button"
              aria-label="select"
              sx={{ borderRadius: "default", paddingX: 3, paddingY: 2, cursor: "pointer" }}
              tabIndex={0}
              onKeyDown={() => onChange(roomWithPrice)}
              onClick={() => onChange(roomWithPrice)}
            >
              {roomWithPrice.room}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export function ProjectCard({
  image,
  name,
  id,
  countryId,
  subTitle,
  locationText,
  status,
  paymentType,
  roomWithPrices,
}: ProjectCardProps) {
  const { priceType, priceTypeSign } = usePriceType()
  const [selected, setSelected] = useState(roomWithPrices[0])
  const statusText = TURKEY_PROJECT_STATUS.find(({ id }) => id === status)?.name

  const price = selected?.[priceType]
  const projectPath = `/countries/${countryId}/projects/${id}`
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
          <Link passHref href={projectPath}>
            <Text
              as="a"
              sx={{ textDecoration: "none", color: "text", ":hover": { color: "primary" } }}
            >
              {subTitle}
            </Text>
          </Link>
        </Box>
        <Flex sx={{ paddingX: 2, justifyContent: "space-between" }}>
          <ProjectCardIconsText text={statusText || ""} icon={ic_format_paint} />
          {roomWithPrices[0]["room"] && (
            <SelectRoom
              selected={selected}
              roomWithPrices={roomWithPrices}
              onChange={setSelected}
            />
          )}
          <ProjectCardIconsText text={paymentType === "cash" ? "كاش" : "تقسيط"} icon={money} />
          <ProjectCardIconsText text={`تبدا من ${price}`} prefix={priceTypeSign} />
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
