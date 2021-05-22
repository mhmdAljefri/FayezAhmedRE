import React from "react"
import { useMutation } from "blitz"
import { AddToFav } from "./AddToFav"
import addOfferToFav from "app/public/fav/mutations/addOfferToFav"

type Props = {
  isActive?: boolean
  offerId: number
  onSuccess?: ({ id, hasFav }: { id: number; hasFav: boolean }) => void
}
const AddOfferToFav = ({ offerId, isActive = false, onSuccess = () => {} }: Props) => {
  const [addOfferToFavMutation] = useMutation(addOfferToFav, {
    onSuccess: (data) => onSuccess({ id: data.id, hasFav: !isActive }),
  })

  return <AddToFav isActive={isActive} onClick={() => addOfferToFavMutation(offerId)} />
}

export default AddOfferToFav
