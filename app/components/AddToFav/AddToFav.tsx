import React, { useState } from "react"

import { Button } from "theme-ui"
import { useSession } from "blitz"
import { toast } from "react-toastify"

import { Icon } from "react-icons-kit"
import { heartO } from "react-icons-kit/fa/heartO"
import { heart } from "react-icons-kit/fa/heart"
import LoginFormModal from "app/auth/components/LoginFormModal"

export const AddToFav = ({
  onClick,
  isActive = false,
}: {
  isActive?: boolean
  onClick: () => Promise<any>
}) => {
  const [open, setOpen] = useState(false)
  const session = useSession()

  const handleClick = () => {
    console.log({ session })
    if (!session.userId) {
      return setOpen(true)
    }
    return onClick().then(() => toast.success("تمت الاضافة الى المفضليات"))
  }

  if (session.isLoading) return <span />

  return (
    <>
      <LoginFormModal onSuccess={handleClick} onRequestClose={() => setOpen(false)} isOpen={open} />
      <Button
        onClick={handleClick}
        sx={{
          backgroundColor: "background",
          marginInlineStart: 10,
          color: isActive ? "red" : "text",
          boxShadow: "default",
        }}
      >
        <span>
          <Icon size={18} icon={isActive ? heart : heartO} />
        </span>
      </Button>
    </>
  )
}
