import { ReactNode } from "react"
import { SxStyleProp, ThemeProvider } from "theme-ui"
import theme from "app/theme"
import Footer from "app/components/Footer"
import dynamic from "next/dynamic"
import MetaTags from "app/components/MetaTags"

const Header = dynamic(() => import("app/components/Header"), {
  ssr: false,
})

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
      <MetaTags
        title={
          title
            ? title + " | Fayez Ahmed Real Estate | فايز احمد العقارية"
            : "فايز احمد العقارية | Fayez Ahmed Real Estate"
        }
      />
      <ThemeProvider theme={theme}>
        <Header sx={headerProps?.sx} />

        {children}
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default Layout
