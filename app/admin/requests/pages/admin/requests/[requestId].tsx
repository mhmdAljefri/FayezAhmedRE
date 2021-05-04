import { Suspense, useEffect } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getRequest from "app/admin/requests/queries/getRequest"
import { Box, Button, Grid, Text } from "theme-ui"
import updateRequest from "app/admin/requests/mutations/updateProject"

const TextWithLabel = ({ label, text }: { label: string; text?: any }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Text as="small">{label}</Text>
      <Text sx={{ p: 0, fontWeight: 700 }} as="p">
        {text}
      </Text>
    </Box>
  )
}
export const Request = () => {
  const requestId = useParam("requestId", "number")
  const [request] = useQuery(getRequest, { where: { id: requestId } })
  const [updateRequestMutation] = useMutation(updateRequest)

  useEffect(() => {
    async function handleUpdate() {
      const payload = request
      delete (payload as any).id
      if (requestId && payload.isNew)
        await updateRequestMutation({
          where: { id: requestId },
          data: { ...payload, isNew: false },
        })
    }

    handleUpdate()
    return () => {}
  }, [requestId, request, updateRequestMutation])

  // check if data is an JSONObject
  const data = request.data instanceof Object && !Array.isArray(request.data) ? request.data : {}

  return (
    <div>
      <h1>الطلب {request.id}</h1>

      <TextWithLabel label="الاسم" text={data.name} />
      <TextWithLabel label="الرقم" text={data.mobile} />
      <TextWithLabel
        label="تاريخ الطلب"
        text={new Intl.DateTimeFormat("en-US").format(request.createdAt)}
      />
      {request.type === "enquire" && (
        <>
          <TextWithLabel label="التفاصيل" text={data.description} />
        </>
      )}
      {request.type === "consultings" && (
        <>
          <TextWithLabel label="التفاصيل" text={data.description} />
          <TextWithLabel label="وقت الاتصال" text={data.callingTime} />
          <TextWithLabel label="الميزانية" text={data.budget} />
        </>
      )}
      {request.type === "cars" && (
        <>
          <TextWithLabel label="عدد الركاب" text={data.count} />
          <TextWithLabel label="وقت الوصول" text={data.arrivalDate} />
          <TextWithLabel label="وقت المقادرة" text={data.departureDate} />
        </>
      )}
      {request.type === "hotels" && (
        <>
          <TextWithLabel text={data.destination} label="الوجهة" />
          <TextWithLabel text={data.arrivalDate} label="تاريخ الوصول" />
          <TextWithLabel text={data.departureDate} label="تاريخ المغادرة" />
          <TextWithLabel text={data.count} label="الأشغال" />
        </>
      )}
      {request.type === "flights" && (
        <>
          <TextWithLabel text={data.destination} label="الوجهة" />
          <Grid columns={2}>
            <TextWithLabel text={data.arrivalDate} label="تاريخ الوصول" />
            <TextWithLabel text={data.arrivalAirport} label="مطار الوصول" />
          </Grid>
          <TextWithLabel text={data.departureDate} label="تاريخ المغادرة" />
          <TextWithLabel text={data.guests} label="الزوار" />
        </>
      )}
    </div>
  )
}

const ShowRequestPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/requests">
          <Button variant="link">&lt; عود الى الطلبات</Button>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Request />
      </Suspense>
    </div>
  )
}

ShowRequestPage.getLayout = (page) => <AdminLayout title={"Request"}>{page}</AdminLayout>

export default ShowRequestPage
