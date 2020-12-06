import { RequestCreateInput } from "@prisma/client"
import { useState } from "react"
import { toast } from "react-toastify"

type requestsTypes = RequestCreateInput["type"]

export default function useRequestsMutation(type: requestsTypes) {
  const [fetching, setFetching] = useState(false)
  const handleSubmit = async (data) => {
    setFetching(true)
    data.type = type
    await fetch("/api/request", {
      method: "post",
      body: JSON.stringify(data),
    })
    toast.success("تم ارسال الطلب")
    setFetching(false)
  }

  return { run: handleSubmit, fetching }
}
