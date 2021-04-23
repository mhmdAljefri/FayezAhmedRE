import { Link } from "blitz"
import React, { ReactNode, useState } from "react"
import { Button, Flex, Box, Heading, Text, SxStyleProp } from "theme-ui"

import Icon, { IconProp } from "react-icons-kit"
import { money } from "react-icons-kit/fa/money"
import { chevronDown } from "react-icons-kit/fa/chevronDown"
import { ic_format_paint } from "react-icons-kit/md/ic_format_paint"
import { Project, RoomWithPrice } from "@prisma/client"
import usePriceType from "app/hooks/usePriceType"
import useOnClickout from "app/hooks/useOnClickout"
import { TURKEY_PROJECT_STATUS } from "app/constants"
import OptmizationImage from "app/components/OptmizationImage"
import SocialShare from "app/components/SocialShare"
import { AddProjectToFav } from "app/components/AddToFav"
import CurrencyPrice from "app/components/CurrencyPrice"
import { IoBed } from "@react-icons/all-files/io5/IoBed"

interface ProjectCardIconsTextProps {
  width?: number
  text: ReactNode
  icon?: IconProp["icon"]
  reactIcon?: ReactNode
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
  hasFav?: boolean
}

function ProjectCardIconsText({ prefix, reactIcon, icon, text, sx }: ProjectCardIconsTextProps) {
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
      {(icon || reactIcon) && (reactIcon || <Icon icon={icon} />)}

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
        <ProjectCardIconsText text={selected?.room} reactIcon={<IoBed />} />
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

function ProjectCard({
  image,
  name,
  id,
  countryId,
  subTitle,
  locationText,
  status,
  paymentType,
  roomsWithPrices,
  hasFav,
}: ProjectCardProps) {
  const { priceTypeSign } = usePriceType()
  const [selected, setSelected] = useState(roomsWithPrices[0])
  const statusText = TURKEY_PROJECT_STATUS.find(({ id }) => id === status)?.name

  const price = selected?.priceQatar
  const projectPath = `/countries/${countryId}/projects/${id}`
  return (
    <Box
      sx={{
        width: ["100%", null, 300, 300, 350],
        backgroundColor: "background",
        marginX: "auto",
        boxShadow: "default",
        marginBottom: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          marginTop: 22,
          zIndex: 22,
          px: 3,
          py: 2,
        }}
      >
        <SocialShare url={projectPath} />
        <AddProjectToFav isActive={hasFav} projectId={id} />
      </Box>
      <Box>
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
            text={
              <span>تبدا من {price ? <CurrencyPrice price={parseInt(price, 10)} /> : "-"}</span>
            }
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

export default ProjectCard
