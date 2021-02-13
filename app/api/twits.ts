import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const TwitsAPI = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const twits = await fetch(
    `https://api.twitter.com/2/users/${process.env.APP_TWITTER_USER_ID}/tweets?tweet.fields=public_metrics`,
    {
      headers: {
        Authorization: "Bearer " + process.env.APP_TWITTER_BEARER_TOKEN,
      },
    }
  ).then((res) => res.json())

  res.status(200).json({
    ...twits,
  })
}

export default TwitsAPI
