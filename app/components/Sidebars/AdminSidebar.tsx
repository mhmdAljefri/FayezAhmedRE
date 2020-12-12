import React, { ReactNode } from "react"
import { Link, useRouter } from "blitz"
import { Badge, Box, Button, Flex, Image, Link as ThemeLink, Text } from "theme-ui"
import { Icon } from "react-icons-kit"
import { star } from "react-icons-kit/fa/star"
import { handshakeO } from "react-icons-kit/fa/handshakeO"
import { industry } from "react-icons-kit/fa/industry"
import { newspaperO } from "react-icons-kit/fa/newspaperO"
import { flagO } from "react-icons-kit/fa/flagO"
import { certificate } from "react-icons-kit/fa/certificate"
import { bed } from "react-icons-kit/fa/bed"
import { image } from "react-icons-kit/fa/image"

const links = [
  { icon: star, name: "الميزات", url: "/admin/features" },
  { icon: handshakeO, name: "الشركاء", url: "/admin/partners" },
  { icon: industry, name: "المشاريع", url: "/admin/projects" },
  { icon: industry, name: "انواع العقارات", url: "/admin/propert-types" },
  { icon: newspaperO, name: "العروض", url: "/admin/offers" },
  { icon: flagO, name: "الدول", url: "/admin/countries" },
  { icon: certificate, name: "انواع المفروشات", url: "/admin/furnish-categories" },
  { icon: bed, name: "المفروشات", url: "/admin/furnishes" },
  { icon: image, name: "المعرض", url: "/admin/carousels" },
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
          display: "flex",
          wordBreak: "keep-all",
          wordWrap: "unset",
          alignItems: "center",
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

export default function AdminSidebar({ logout, newRequestsCount }) {
  const icons: ReactNode[] = []
  const texts: ReactNode[] = []

  links.forEach(({ icon, name, url }) => {
    icons.push(
      <Link passHref key={url} href={url}>
        <ActiveLink>
          <Icon style={{ margin: "auto" }} size={20} icon={icon} />
        </ActiveLink>
      </Link>
    )
    texts.push(
      <Link passHref key={url} href={url}>
        <ActiveLink>
          <Box sx={{ wordWrap: "normal", wordBreak: "keep-all" }}>{name}</Box>
        </ActiveLink>
      </Link>
    )
  })
  return (
    <Box
      sx={{
        width: [100, null, 250],
        overflow: "hidden",
        paddingX: 2,
        backgroundColor: "dark",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: 150,
        transition: "all 0.4s linear",
        ":hover": {
          width: 250,
        },
      }}
    >
      <Box sx={{ width: [70, null, 100], paddingX: [2, null, 3], paddingY: 3 }}>
        <Image
          sx={{ objectFit: "contain" }}
          src="/logo.png"
          alt="Fayez Ahmed RealEstate | فائز احمد العقارية"
        />
      </Box>

      <Flex sx={{ marginTop: 5 }} as="nav">
        <Box sx={{ minWidth: 72, textAlign: "center" }}>{icons}</Box>
        <Box sx={{ minWidth: 150 }}>{texts}</Box>
      </Flex>
      <Box sx={{ marginTop: 4 }}>
        <Link passHref href={`/admin/requests`}>
          <ActiveLink>
            <Box sx={{ textAlign: "center", minWidth: 55, marginInlineEnd: 18 }}>
              <Badge>{newRequestsCount}</Badge>
            </Box>
            <Text sx={{ minWidth: 150 }}>الطلبات</Text>
          </ActiveLink>
        </Link>
      </Box>

      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Button onClick={logout} sx={{ width: "100%" }} variant="link">
          الخروج
        </Button>
      </Box>
    </Box>
  )
}
