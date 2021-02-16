import { ReactNode } from "react"
import { Head } from "blitz"
import Footer from "app/components/Footer"
import Header from "app/components/Header"
import { SxStyleProp, ThemeProvider } from "theme-ui"
import theme from "app/theme"

type LayoutProps = {
  title?: string
  children: ReactNode
  headerProps?: {
    sx?: SxStyleProp
  }
}

const Layout = ({ title, headerProps, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? title + " | فايز احمد العقارية" : "فايز احمد العقارية"}</title>

        {/* <!-- Manifest  --> */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Header sx={headerProps?.sx} />

        {children}
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default Layout
