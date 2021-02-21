import React, { Suspense } from "react"
import { Box, Heading } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import { Icon } from "react-icons-kit"
import { twitter } from "react-icons-kit/fa/twitter"
import TwitCard from "app/components/Cards/TwitCard"
import { dynamic } from "blitz"
import LazyLoad from "react-lazyload"

const TwitsList = dynamic(() => import("./TwitsList"), { ssr: false })

export default function Twits() {
  return (
    <Box
      sx={{
        backgroundColor: "light",
      }}
    >
      <Wrapper>
        <Heading sx={{ pt: 5, pb: 4, fontSize: [4, 5, 6] }}>
          <Icon icon={twitter} size={32} style={{ marginInlineEnd: 15, color: "#1da1f2" }} />
          <span>اخر الاخبار</span>
        </Heading>
        <Suspense
          fallback={[
            ...Array(3).map((_, index) => (
              <TwitCard key={index} id={index} text="جاري التحميل..." />
            )),
          ]}
        >
          <LazyLoad offset={50}>
            <TwitsList />
          </LazyLoad>
        </Suspense>
      </Wrapper>
    </Box>
  )
}
