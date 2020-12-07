import { ReactNode, Suspense } from "react"
import {
  AuthenticationError,
  AuthorizationError,
  Head,
  useMutation,
  usePaginatedQuery,
  useSession,
} from "blitz"
import { Box, Flex, SxStyleProp, ThemeProvider } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import AdminSidebar from "app/components/Sidebars/AdminSidebar"
import logout from "app/auth/mutations/logout"

import adminTheme from "app/theme/admin"
import ChangeColorsMode from "app/components/ChangeColorsMode"
import { BarLoader } from "react-spinners"
import getNewRequestsCount from "app/admin/requests/queries/getNewRequestsCount"

type AdminLayoutProps = {
  title?: string
  children: ReactNode
  headerProps?: {
    sx?: SxStyleProp
  }
}

const AdminLayout = ({ title, headerProps, children }: AdminLayoutProps) => {
  const sesstion = useSession()
  const [logoutMutation] = useMutation(logout)
  const [{ count }] = usePaginatedQuery(getNewRequestsCount, {})

  const handleLogout = async () => {
    try {
      await logoutMutation()
      window.location.pathname = "/"
    } catch (error) {
      console.error(error)
    }
  }

  if (sesstion.isLoading) return <BarLoader />
  if (!sesstion.userId) throw new AuthenticationError("يرجى تسجيل الدخول")
  if (!sesstion.roles.includes("admin")) throw new AuthorizationError("غير مخول لك بالدخول")

  return (
    <>
      <Head>
        <title>{title || "FayezAhmed"}</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={adminTheme}>
        <Flex
          sx={{
            backgroundColor: "light",
          }}
        >
          <Suspense fallback="...">
            <AdminSidebar newRequestsCount={count} logout={handleLogout} />
          </Suspense>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingX: 4,
              ":before": {
                content: '""',
                position: "absolute",
                top: "0",
                zIndex: -1,
                left: 0,
                right: 0,
                height: 200,
              },
            }}
          >
            <Flex sx={{ justifyContent: "flex-end", width: "100%", paddingY: 4 }}>
              <ChangeColorsMode />
            </Flex>
            <Suspense fallback="...">
              <Wrapper sx={{ marginTop: 5, width: "100%" }}>{children}</Wrapper>
            </Suspense>
          </Box>
        </Flex>
      </ThemeProvider>
    </>
  )
}

export default AdminLayout
