import { AppProps, ErrorComponent, useRouter } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"
import LoginForm from "app/auth/components/LoginForm"
import { ComponentType, Suspense } from "react"

import Router from "next/router"
import NProgress from "nprogress" //nprogress module
import { ToastContainer } from "react-toastify"
import PriceProvider from "app/context/price"
import dynamic from "next/dynamic"

import "nprogress/nprogress.css" //styles of nprogress
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "app/styles/slick-modifier.css"
import "react-phone-number-input/style.css"
import "react-toastify/dist/ReactToastify.css"
import "suneditor/dist/css/suneditor.min.css" // Import Sun Editor's CSS File
import "react-datepicker/dist/react-datepicker.css"
import "rc-drawer/assets/index.css"

type AnimatedProps = { color?: string }
const AnimatedCursor: ComponentType<AnimatedProps> = dynamic(
  () => import("react-animated-cursor"),
  {
    ssr: false,
  }
)

//Binding events.
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
      <Suspense fallback="...">
        <PriceProvider>
          <>
            <ToastContainer />

            {getLayout(<Component {...pageProps} />)}
          </>
        </PriceProvider>
      </Suspense>
      <AnimatedCursor color="216, 192, 122" />
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
