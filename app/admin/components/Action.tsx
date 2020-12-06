import React, { useState } from "react"
import { Icon } from "react-icons-kit"
import { remove } from "react-icons-kit/fa/remove"
import { pencilSquare } from "react-icons-kit/fa/pencilSquare"
import { Box, Button, Link as ThemeLink } from "theme-ui"
import Alert from "./Alert"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link, useRouter } from "blitz"

type ActonPropsType = {
  id: number
  onDelete?: () => Promise<any>
}

export default function Action({ id, onDelete }: ActonPropsType) {
  const [open, setOpen] = useState(false)
  const { pathname } = useRouter()
  const editLink = `${pathname}/${id}/edit`

  const handleDelete = async () => {
    if (!onDelete) return
    try {
      await onDelete()
      toast.success("تم الحذف بنجاح")
    } catch (error) {
      toast.error("خطاء في حذف العنصر")
    } finally {
      handleToggle()
    }
  }

  const handleToggle = () => {
    setOpen(!open)
  }
  return (
    <>
      <ToastContainer />
      <Box sx={{ width: 120, marginRight: "auto" }}>
        <Button type="button" onClick={handleToggle} sx={{ color: "red" }} variant="link">
          <Icon icon={remove} />
        </Button>
        <Alert text="هل تريد حذف العنصر" title="تاكيد الحذف" open={open} onToggle={handleDelete} />
        <ThemeLink as={Link} href={editLink} type="button" sx={{ color: "text" }} variant="link">
          <Icon icon={pencilSquare} />
        </ThemeLink>
      </Box>
    </>
  )
}
