import Filter, { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import getProjectsInfinite from "app/public/projects/queries/getInfiniteProjects"
import { Link, useInfiniteQuery, useParam, useQuery, useRouterQuery } from "blitz"
import React, { ReactNode, useRef, useState } from "react"
import { Button, Flex, Grid, Box, Heading, Text, SxStyleProp } from "theme-ui"

import Icon, { IconProp } from "react-icons-kit"
import { building } from "react-icons-kit/fa/building"
import { money } from "react-icons-kit/fa/money"
import { chevronDown } from "react-icons-kit/fa/chevronDown"
import { ic_format_paint } from "react-icons-kit/md/ic_format_paint"
import { City, Country, Project, RoomWithPrice } from "@prisma/client"
import usePriceType from "app/hooks/usePriceType"
import useOnClickout from "app/hooks/useOnClickout"
import FetchMoreButton from "app/components/FetchMoreButton"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import { TURKEY_PROJECT_STATUS } from "app/constants"
import { numberFormat } from "app/utils"
import OptmizationImage from "app/components/OptmizationImage"

const getListOfPrice = (price?: number[]): number[] => {
  if (!price) return []
  const arr = price.toString().split(",") // wtf
  const firstPrice = parseInt(arr[0], 10)
  const lastPrice = parseInt(arr[0], 10)
  return [firstPrice, lastPrice]
}
interface ProjectCardIconsTextProps {
  width?: number
  text: string
  icon?: IconProp["icon"]
  prefix?: ReactNode
  sx?: SxStyleProp
}

export type ProjectCardProps = Pick<
  Project,
  | "id"
  | "name"
  | "image"
  | "locationText"
  | "subTitle"
  | "paymentType"
  | "countryId"
  | "status"
  | "cityId"
> & {
  roomsWithPrices: RoomWithPrice[]
}

function ProjectCardIconsText({ prefix, icon, text, sx }: ProjectCardIconsTextProps) {
  return (
    <Flex
      sx={{
        marginBottom: 0,
        height: [30, 30, 30, 40],
        color: "lightText",
        alignItems: "center",
        ...sx,
      }}
    >
      {icon && <Icon icon={icon} />}

      {prefix && <span style={{ whiteSpace: "nowrap", paddingInlineStart: 10 }}>{prefix}</span>}
      <Box
        as="span"
        sx={{
          marginInlineEnd: 5,
          marginInlineStart: 5,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: [1, 1, 1, 2],
        }}
      >
        {text}
      </Box>
    </Flex>
  )
}

function SelectRoom({ roomsWithPrices, selected, onChange }) {
  const { open, setOpen, ref } = useOnClickout()

  if (!selected) return <div />
  return (
    <Box ref={ref} sx={{ position: "relative" }}>
      <Button
        sx={{ height: 40, padding: 0, minWidth: 80, display: "flex" }}
        variant="link"
        onClick={() => setOpen(true)}
      >
        <ProjectCardIconsText text={selected?.room} icon={building} />
        <Box sx={{ marginX: 1, marginTop: 1 }}>
          <Icon size={12} icon={chevronDown} />
        </Box>
      </Button>

      {open && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 5,
            boxShadow: "default",
            backgroundColor: "background",
          }}
        >
          {roomsWithPrices.map((roomWithPrice, index) => (
            <Box
              key={roomWithPrice?.room + "_" + index}
              role="button"
              aria-label="select"
              sx={{ borderRadius: "default", paddingX: 3, paddingY: 2, cursor: "pointer" }}
              tabIndex={0}
              onKeyDown={() => {
                onChange(roomWithPrice)
                setOpen(false)
              }}
              onClick={() => {
                onChange(roomWithPrice)
                setOpen(false)
              }}
            >
              {roomWithPrice?.room}
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
  roomsWithPrices,
}: ProjectCardProps) {
  const { priceType, priceTypeSign } = usePriceType()
  const [selected, setSelected] = useState(roomsWithPrices[0])
  const statusText = TURKEY_PROJECT_STATUS.find(({ id }) => id === status)?.name

  const price = selected?.[priceType]
  const projectPath = `/countries/${countryId}/projects/${id}`
  return (
    <Box
      sx={{
        width: ["100%", null, 370],
        backgroundColor: "background",
        marginX: "auto",
        boxShadow: "default",
        marginBottom: 2,
      }}
    >
      <Box sx={{}}>
        <Link passHref href={projectPath}>
          <a>
            <OptmizationImage width={500} height={280} layout="responsive" src={image as string} />
          </a>
        </Link>
      </Box>
      <Box sx={{ paddingY: [1, 2, 3], paddingX: [2, 2, 3] }}>
        <Flex>
          {roomsWithPrices[0]?.["room"] && (
            <SelectRoom
              selected={selected}
              roomsWithPrices={roomsWithPrices}
              onChange={setSelected}
            />
          )}
          <ProjectCardIconsText
            sx={{ color: "primary", fontSize: [2], fontWeight: 700 }}
            text={`تبدا من ${numberFormat(price)}`}
            prefix={priceTypeSign}
          />
        </Flex>

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
      <Flex
        sx={{
          paddingY: 2,
          justifyContent: ["space-evenly"],
          flexWrap: ["wrap", null, "nowrap"],
        }}
      >
        <ProjectCardIconsText text={statusText || ""} icon={ic_format_paint} />

        <ProjectCardIconsText text={paymentType === "cash" ? "كاش" : "تقسيط"} icon={money} />
      </Flex>
    </Box>
  )
}

type ProjectListTypes = {
  title: string
  subTitle: string
  country: Country & { cities: City[] }
  projects: ProjectCardProps[]
}

function CityButton({ children, isSelected, onClick }) {
  return (
    <Box
      onClick={onClick}
      role="button"
      aria-label={children}
      sx={{
        cursor: "pointer",
        borderRadius: "md",
        backgroundColor: isSelected ? "white" : "primary",
        borderWidth: 3,
        paddingY: 2,
        paddingX: 3,
        fontWeight: "700",
        textAlign: "center",
        color: isSelected ? "primary" : "heading",
        borderColor: "primary",
        borderStyle: "solid",
        marginTop: 2,
        width: 120,
      }}
    >
      {children}
    </Box>
  )
}
interface SelectedCity {
  id: number | string
  name: string
}

export default function ProjectsList({ country, projects, title, subTitle }: ProjectListTypes) {
  const filter = useRouterQuery()
  const filterRef = useRef<filterValues>(filter)
  const countryId = parseInt(useParam("countryId") as string)
  const { search, city, price, propertyType, status } = filterRef.current || {}
  const [{ propertyTypes }] = useQuery(getPropertyTypes, {})
  const [selected, setSelected] = useState<SelectedCity>({ id: "اظهار الكل", name: "اظهار الكل" })
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
          { name: { contains: search } },
          { subTitle: { contains: search } },
          { details: { contains: search } },
        ],
        propertyType: {
          id: {
            equals: propertyType ? parseInt(propertyType) : undefined,
          },
        },
        status: status,
        //         propertyType
        // status
        city: { id: parseInt(city || "") || undefined },
        roomsWithPrices: {
          some: {
            price: {
              lt: price?.[1]?.toString() || undefined,
            },
            OR: {
              price: {
                gt: price?.[0]?.toString() || undefined,
              },
            },
          },
        },
      },
    }),
    {
      initialData: [{ projects, nextPage: 2 }],
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
          <Text sx={{ fontSize: 4 }}>{subTitle}</Text>
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
            const getList = getListOfPrice(data.price) // wtf
            const newData = {
              ...data,
              price: getList,
            }

            filterRef.current = newData
            refetch()
          }}
        />
      </Wrapper>

      {country.isTurkey && (
        <Wrapper>
          <Flex
            sx={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {country.cities &&
              [...[{ id: "اظهار الكل", name: "اظهار الكل" }], ...country.cities].map((city) => (
                <CityButton
                  isSelected={selected.id === city.id}
                  key={city.id}
                  onClick={() => setSelected({ id: city.id, name: city.name })}
                >
                  {city.name}
                </CityButton>
              ))}
          </Flex>
        </Wrapper>
      )}

      <Box>
        <Wrapper>
          <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
            {groupedProjects.map((group, i) => (
              <React.Fragment key={i}>
                {country.isTurkey
                  ? selected.id === "اظهار الكل"
                    ? group.projects.map((project) => (
                        <ProjectCard
                          {...project}
                          roomsWithPrices={project.roomsWithPrices}
                          key={project.id}
                        />
                      ))
                    : group.projects
                        .filter((pro) => pro.cityId === selected.id)
                        .map((project) => (
                          <ProjectCard
                            {...project}
                            roomsWithPrices={project.roomsWithPrices}
                            key={project.id}
                          />
                        ))
                  : group.projects.map((project) => (
                      <ProjectCard
                        {...project}
                        roomsWithPrices={project.roomsWithPrices}
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
