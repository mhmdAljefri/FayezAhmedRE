import React from "react"
import addProjectToFav from "app/public/fav/mutations/addProjectToFav"
import { useMutation } from "blitz"
import { AddToFav } from "./AddToFav"

const AddProjectToFav = ({ projectId }: { projectId: number }) => {
  const [addProjectToFavMutation] = useMutation(addProjectToFav)

  return <AddToFav onClick={() => addProjectToFavMutation(projectId)} />
}
export default AddProjectToFav
