import { AppProps, ErrorComponent, useRouter } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { Suspense } from "react"

import Router from "next/router"
import { ToastContainer } from "react-toastify"
import { queryCache } from "react-query"
import FullpageLoader from "app/components/Loaders/Fullpage"
import NProgress from "nprogress"
import dynamic from "next/dynamic"

import "swiper/swiper.scss"
import "swiper/components/effect-fade/effect-fade.scss"
import "swiper/components/pagination/pagination.scss"
import "swiper/components/navigation/navigation.scss"
import "rc-drawer/assets/index.css"
import "nprogress/nprogress.css" //styles of nprogress
import "react-tippy/dist/tippy.css"
import "app/styles/slick-modifier.css"
import "react-toastify/dist/ReactToastify.css"
import "app/styles/global.css"
import "app/styles/animate.css"
import "react-calendar/dist/Calendar.css"

const PriceProvider = dynamic(() => import("app/context/price"), { ssr: false }) //nprogress module
const LoginForm = dynamic(() => import("app/auth/components/LoginForm"), { ssr: false }) //nprogress module

//Binding events.
NProgress.configure({ showSpinner: false })
Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      <Suspense fallback={<FullpageLoader />}>
        <PriceProvider price={"roomPrice"}>
          <>
            <ToastContainer />

            {getLayout(<Component {...pageProps} />)}
          </>
        </PriceProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error?.name === "AuthenticationError") {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error?.name === "AuthorizationError") {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
