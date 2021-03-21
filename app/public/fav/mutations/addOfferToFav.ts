import db from "db"
import { Ctx, AuthorizationError } from "blitz"

type UpdateOfferInput = number

export default async function addOfferToFav(offerId: UpdateOfferInput, ctx: Ctx) {
  const userId = ctx?.session?.userId
  if (!userId) {
    throw new AuthorizationError()
  }

  const hasFav = await db.offer.findFirst({
    where: {
      id: offerId,
      users: {
        some: { id: userId },
      },
    },
  })

  const offer = await db.offer.update({
    where: { id: offerId },

    data: {
      users: {
        ...(hasFav
          ? {
              disconnect: {
                id: userId,
              },
            }
          : {
              connect: {
                id: userId,
              },
            }),
      },
    },
  })

  return offer
}
