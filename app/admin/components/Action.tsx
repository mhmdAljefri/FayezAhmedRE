import React from "react"
import { Icon } from "react-icons-kit"
import { remove } from "react-icons-kit/fa/remove"
import { pencilSquare } from "react-icons-kit/fa/pencilSquare"
import { Box, Button, Link as ThemeLink } from "theme-ui"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link, useRouter } from "blitz"

type ActonPropsType = {
  id: number
  onDelete?: () => Promise<any>
}

export default function Action({ id, onDelete }: ActonPropsType) {
  const { asPath } = useRouter()
  const editLink = `${asPath}/${id}/edit`

  return (
    <>
      <ToastContainer />
      <Box sx={{ width: 120, marginRight: "auto" }}>
        <Button
          type="button"
          onClick={() => {
            const isApproved = window.confirm("هل تريد حذف العنصر")
            isApproved && onDelete?.()
          }}
          sx={{ color: "red", visibility: onDelete ? "visible" : "hidden" }}
          variant="link"
        >
          <Icon icon={remove} />
        </Button>
        <ThemeLink as={Link} href={editLink} type="button" sx={{ color: "heading" }} variant="link">
          <Icon icon={pencilSquare} />
        </ThemeLink>
      </Box>
    </>
  )
}
