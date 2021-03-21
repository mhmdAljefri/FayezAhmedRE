import React from "react"
import addProjectToFav from "app/public/fav/mutations/addProjectToFav"
import { useMutation } from "blitz"
import { AddToFav } from "./AddToFav"

const AddProjectToFav = ({
  projectId,
  isActive = false,
}: {
  projectId: number
  isActive?: boolean
}) => {
  const [addProjectToFavMutation] = useMutation(addProjectToFav)

  return <AddToFav isActive={isActive} onClick={() => addProjectToFavMutation(projectId)} />
}
export default AddProjectToFav
