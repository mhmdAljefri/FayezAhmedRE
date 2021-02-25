import React, { Suspense } from "react"
import { Box, Heading } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import { Icon } from "react-icons-kit"
import { twitter } from "react-icons-kit/fa/twitter"
import TwitCard from "app/components/Cards/TwitCard"
import { dynamic } from "blitz"
import LazyLoad from "react-lazyload"
import { ErrorBoundary } from "react-error-boundary"

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
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <button
              onClick={() => {
                // this next line is why the fallbackRender is useful
                // though you could accomplish this with a combination
                // of the FallbackCallback and onReset props as well.
                resetErrorBoundary()
              }}
            >
              اعادة التحميل
            </button>
          )}
        >
          <Suspense
            fallback={[
              ...Array(3).map((_, index) => (
                <TwitCard key={index} id={index} text="جاري التحميل..." />
              )),
            ]}
          >
            <LazyLoad once offset={50}>
              <TwitsList />
            </LazyLoad>
          </Suspense>
        </ErrorBoundary>
      </Wrapper>
    </Box>
  )
}
