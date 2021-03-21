import React, { useState } from "react"
import { Box, Button } from "theme-ui"
import { useSession, useMutation } from "blitz"
import Dropdown from "../Dropdown"
import MyFav from "../MyFav"
import logout from "app/auth/mutations/logout"
import LoginFormModal from "app/auth/components/LoginFormModal"

export default function UserDropdwon() {
  const { isLoading, userId } = useSession()
  const [open, setOpen] = useState(false)
  const [openFav, setOpenFav] = useState(false)
  const [logoutMutation] = useMutation(logout)

  if (isLoading) return <div />

  return (
    <div>
      <Dropdown
        outterStyle={{ marginInlineEnd: 20 }}
        title={
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 30,
              mx: [2, 2, 3],
              border: (t) => `3px solid ${t.colors.primary}`,
              backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
            }}
          ></Box>
        }
        onChange={() => {}}
      >
        {userId ? (
          <div>
            <Box sx={{ py: 2, px: 3 }} role="button" onClick={() => setOpenFav(true)}>
              المفضيات
            </Box>
            <Button onClick={logoutMutation}>تسجيل الخروج</Button>
          </div>
        ) : (
          <>
            <Button onClick={() => setOpen(true)}>تسجيل الدخول</Button>
          </>
        )}
      </Dropdown>
      <MyFav open={openFav} onClose={() => setOpenFav(false)} />
      <LoginFormModal isOpen={open} onRequestClose={() => setOpen(false)} />
    </div>
  )
}
