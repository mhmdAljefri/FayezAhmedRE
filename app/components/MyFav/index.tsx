import React, { Suspense } from "react"
import { Box, Flex, Heading } from "theme-ui"
import Drawer from "../Drawer"
import { useQuery } from "blitz"
import getMyFav from "app/public/fav/queries/getMyFav"
import FavCard from "../Cards/FavCard"

import { arrows_remove } from "react-icons-kit/linea/arrows_remove"
import Icon from "react-icons-kit"

type Props = { onClose: () => any; open: boolean }
function MyFavFetcher({ onClose, open }: Props) {
  const [{ offers, projects }] = useQuery(getMyFav, {})

  return (
    <div>
      <Drawer onClose={onClose} open={open}>
        <Box
          sx={{
            width: ["calc(90vw - 50px)", 400, 500],
            minHeight: "100vh",
            backgroundColor: "dark",
            px: 4,
            marginInlineStart: 30,
            py: 4,
          }}
        >
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Heading>المفضليات</Heading>

            <Icon size={36} style={{ color: "heading" }} onClick={onClose} icon={arrows_remove} />
          </Flex>
          <Box>
            {offers.map(({ id, subTitle, image, countryId }) => (
              <FavCard
                href={`/countries/${countryId}/offers/${id}`}
                key={id}
                name={subTitle || ""}
                subTitle={""}
                image={image!}
              />
            ))}
            <hr />
            {projects.map(({ id, name, image, subTitle, countryId }) => (
              <FavCard
                key={id}
                href={`/countries/${countryId}/projects/${id}`}
                image={image}
                name={name}
                subTitle={subTitle}
              />
            ))}
          </Box>
        </Box>
      </Drawer>
    </div>
  )
}

export default function MyFav(props: Props) {
  return (
    <Suspense fallback="">
      <MyFavFetcher {...props} />
    </Suspense>
  )
}
