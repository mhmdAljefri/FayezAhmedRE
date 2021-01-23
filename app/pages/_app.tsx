import { AppProps, ErrorComponent, useParam, useRouter } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import LoginForm from "app/auth/components/LoginForm"
import { Suspense } from "react"

import Router from "next/router"
import NProgress from "nprogress" //nprogress module
import { ToastContainer } from "react-toastify"
import PriceProvider from "app/context/price"
import { queryCache } from "react-query"

import "react-phone-number-input/style.css"
import "rc-drawer/assets/index.css"
import "nprogress/nprogress.css" //styles of nprogress
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "react-tippy/dist/tippy.css"
import "app/styles/slick-modifier.css"
import "app/styles/fonts.css" // add local fonts
import "app/styles/animate.css"
import "react-toastify/dist/ReactToastify.css"
import "glider-js/glider.min.css"

//Binding events.
NProgress.configure({ showSpinner: false })
Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  const countryId = useParam("countryId", "number")

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
      <Suspense fallback="...">
        <PriceProvider price={countryId === 2 ? "priceQatar" : "price"}>
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
