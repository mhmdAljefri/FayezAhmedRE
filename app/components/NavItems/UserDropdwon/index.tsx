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
      <Dropdown
        showIcon={false}
        outterStyle={{ marginInlineEnd: 20 }}
        title={
          <Flex
            sx={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 28,
              mx: [2, 2, 3],
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
          {userId ? (
            <div>
              <Box sx={{ py: 2, px: 1 }} role="button" onClick={() => setOpenFav(true)}>
                المفضليات
              </Box>
              <Button variant="link" onClick={logoutMutation}>
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <>
              <Button variant="link" onClick={() => setOpen(true)}>
                تسجيل الدخول
              </Button>
            </>
          )}
        </Box>
      </Dropdown>
      {openFav && <MyFav open={openFav} onClose={() => setOpenFav(false)} />}
      <LoginFormModal isOpen={open} onRequestClose={() => setOpen(false)} />
    </div>
  )
}
