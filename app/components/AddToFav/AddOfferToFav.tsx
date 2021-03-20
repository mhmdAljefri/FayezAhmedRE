import React from "react"
import { useMutation } from "blitz"
import { AddToFav } from "./AddToFav"
import addOfferToFav from "app/public/fav/mutations/addOfferToFav"

const AddOfferToFav = ({ offerId, isActive = false }: { isActive?: boolean; offerId: number }) => {
  const [addOfferToFavMutation] = useMutation(addOfferToFav)

  return <AddToFav isActive={isActive} onClick={() => addOfferToFavMutation(offerId)} />
}

export default AddOfferToFav
