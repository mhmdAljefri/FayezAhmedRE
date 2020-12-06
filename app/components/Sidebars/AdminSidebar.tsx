import React, { ReactNode } from "react"
import { Link, useRouter } from "blitz"
import { Box, Button, Image, Link as ThemeLink } from "theme-ui"

const links = [
  { name: "الميزات", url: "/admin/features" },
  { name: "الشركاء", url: "/admin/partners" },
  { name: "المشاريع", url: "/admin/projects" },
  { name: "الدول", url: "/admin/ciuntries" },
  { name: "انواع المفروشات", url: "/admin/furnish-categories" },
  { name: "المفروشات", url: "/admin/furnishes" },
  { name: "المعرض", url: "/admin/carousels" },
]

type ActiveLinkProps = {
  children: ReactNode
  href?: string
}

const ActiveLink = React.forwardRef<HTMLInputElement, ActiveLinkProps>(
  ({ children, href }, ref) => {
    const { pathname } = useRouter()

    const isActive = href && pathname?.startsWith(href || "")

    return (
      <ThemeLink
        href={href}
        sx={{
          variant: "links.dashboard",
          display: "block",
          paddingY: 1,
          paddingX: 2,
          color: isActive ? "primary" : "lightText",
          borderLeftStyle: "solid",
          borderLeftColor: "dark",
          borderLeftWidth: isActive ? 3 : 0,
        }}
      >
        {children}
      </ThemeLink>
    )
  }
)

export default function AdminSidebar({ logout }) {
  return (
    <Box
      sx={{
        width: [100, null, 250],
        paddingX: 2,
        backgroundColor: "dark",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: 150,
      }}
    >
      <Box sx={{ width: 100, paddingX: [0, null, 3], paddingY: 3 }}>
        <Image
          sx={{ objectFit: "contain" }}
          src="/logo.png"
          alt="Fayez Ahmed RealEstate | فائز احمد العقارية"
        />
      </Box>

      <Box sx={{ marginTop: 5 }} as="nav">
        {links.map(({ url, name }) => (
          <Link passHref key={url} href={url}>
            <ActiveLink>{name}</ActiveLink>
          </Link>
        ))}
      </Box>

      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Button onClick={logout} sx={{ width: "100%" }} variant="link">
          الخروج
        </Button>
      </Box>
    </Box>
  )
}
