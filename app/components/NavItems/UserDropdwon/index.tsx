import React, { useState } from "react"
import { Box, Button, Flex } from "theme-ui"
import { useSession, useMutation } from "blitz"
import Dropdown from "../../Dropdown"
import MyFav from "../../MyFav"
import logout from "app/auth/mutations/logout"
import LoginFormModal from "app/auth/components/LoginFormModal"

export default function UserDropdwon({ sx }) {
  const { isLoading, userId } = useSession()
  const [open, setOpen] = useState(false)
  const [openFav, setOpenFav] = useState(false)
  const [logoutMutation] = useMutation(logout)

  if (isLoading) return <div />

  return (
    <div>
      {userId ? (
        <Dropdown
          showIcon={false}
          outterStyle={{ marginInlineEnd: 20 }}
          title={
            <Flex
              sx={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 28,
                variant: "links.default",
                ...sx,
              }}
            >
              الملف الشخصي
            </Flex>
          }
          onChange={() => {}}
        >
          <Box sx={{ minWidth: 130 }}>
            <div>
              <Box sx={{ py: 2, px: 2 }} role="button" onClick={() => setOpenFav(true)}>
                المفضليات
              </Box>
              <Button variant="link" onClick={logoutMutation}>
                تسجيل الخروج
              </Button>
            </div>
          </Box>
        </Dropdown>
      ) : (
        <>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 28,
              variant: "links.default",
              ...sx,
            }}
            variant="link"
            onClick={() => setOpen(true)}
          >
            تسجيل الدخول
          </Box>
        </>
      )}
      {openFav && <MyFav open={openFav} onClose={() => setOpenFav(false)} />}
      <LoginFormModal isOpen={open} onRequestClose={() => setOpen(false)} />
    </div>
  )
}
