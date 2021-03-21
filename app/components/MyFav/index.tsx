import React, { Suspense } from "react"
import { Box, Heading } from "theme-ui"
import Drawer from "../Drawer"
import { useQuery } from "blitz"
import getMyFav from "app/public/fav/queries/getMyFav"
import FavCard from "../Cards/FavCard"
type Props = { onClose: () => any; open: boolean }
function MyFavFetcher({ onClose, open }: Props) {
  const [{ offers, projects }] = useQuery(getMyFav, {})

  return (
    <div>
      <Drawer handler={false} onClose={onClose} open={open}>
        <Box sx={{ py: 4, px: 3, width: [250, 350, 450], maxWidth: "80vw" }}>
          <Heading>المفضيات</Heading>
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
