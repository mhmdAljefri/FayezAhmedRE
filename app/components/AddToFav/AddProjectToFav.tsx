import React from "react"
import addProjectToFav from "app/public/fav/mutations/addProjectToFav"
import { useMutation } from "blitz"
import { AddToFav } from "./AddToFav"

const AddProjectToFav = ({
  projectId,
  isActive = false,
  onSuccess,
}: {
  projectId: number
  isActive?: boolean
  onSuccess?: ({ id, hasFav }: { id: number; hasFav: boolean }) => void
}) => {
  const [addProjectToFavMutation] = useMutation(addProjectToFav, {
    onSuccess: (data) => {
      data && onSuccess && onSuccess({ id: data?.id, hasFav: !isActive })
    },
  })

  return <AddToFav isActive={isActive} onClick={() => addProjectToFavMutation(projectId)} />
}
export default AddProjectToFav
