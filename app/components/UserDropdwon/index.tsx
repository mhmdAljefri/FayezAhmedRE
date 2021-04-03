import React, { useState } from "react"
import { Box, Button, Flex } from "theme-ui"
import { useSession, useMutation } from "blitz"
import Dropdown from "../Dropdown"
import MyFav from "../MyFav"
import logout from "app/auth/mutations/logout"
import LoginFormModal from "app/auth/components/LoginFormModal"
import { userCircle } from "react-icons-kit/fa/userCircle"
import { Icon } from "react-icons-kit"

export default function UserDropdwon() {
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
              width: 28,
              height: 28,
              borderRadius: 28,
              mx: [2, 2, 3],
              backgroundColor: "white",
              color: "text",
            }}
          >
            <Icon size={30} icon={userCircle} />
          </Flex>
        }
        onChange={() => {}}
      >
        <Box sx={{ minWidth: 130 }}>
          {userId ? (
            <div>
              <Box sx={{ py: 2, px: 1 }} role="button" onClick={() => setOpenFav(true)}>
                المفضيات
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
