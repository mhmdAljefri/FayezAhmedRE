import React, { useState } from "react"
import { Box, Heading } from "theme-ui"
import Drawer from "../Drawer"
import { useQuery } from "blitz"
import getMyFav from "app/public/fav/queries/getMyFav"
import FavCard from "../Cards/FavCard"

export default function MyFav() {
  const [open, setOpen] = useState(false)
  const [{ offers, projects }] = useQuery(getMyFav, {})

  return (
    <div>
      <Box sx={{ py: 2, px: 3 }} role="button" onClick={() => setOpen(true)}>
        المفضيات
      </Box>

      <Drawer handler={false} onClose={() => setOpen(false)} open={open}>
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
