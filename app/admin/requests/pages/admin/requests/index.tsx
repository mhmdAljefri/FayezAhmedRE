import { Suspense, useState } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { usePaginatedQuery, useRouter, BlitzPage, Link } from "blitz"
import getRequests from "app/admin/requests/queries/getRequests"
import DynamicTable from "app/components/Tables/DynamicTable"
import { Request } from "@prisma/client"
import { Badge, Box, Button, Flex, Text } from "theme-ui"

const ITEMS_PER_PAGE = 100

const translations = {
  cars: "السيارات",
  consultings: "الاستشارات",
  flights: "الطيران",
  hotels: "الفنادق",
}

export const RequestsList = () => {
  const router = useRouter()
  const [type, setType] = useState<Request["type"]>("consultings")
  const page = Number(router.query.page) || 0
  const [{ requests, hasMore }] = usePaginatedQuery(getRequests, {
    orderBy: { id: "desc" },
    where: { type },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const types: Request["type"][] = ["cars", "consultings", "flights", "hotels"]
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Flex>
        {types.map((t) => (
          <Button
            onClick={() => setType(t)}
            sx={{ margin: 3 }}
            variant={t === type ? "link" : undefined}
          >
            {translations[t]}
          </Button>
        ))}
      </Flex>
      <DynamicTable
        hasMore={hasMore}
        headers={[
          {
            name: "",
            key: "id",
          },
          {
            name: "الاسم",
            key: "data.name",
          },
          {
            name: "",
            props: { style: { width: 150 } },
            render: ({ id, isNew }) => (
              <Flex sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: isNew ? "primary" : "muted",
                    borderRadius: 10,
                    marginX: 2,
                  }}
                />
                <Text sx={{ color: isNew ? "heading" : "text", marginInlineEnd: 50 }}>
                  {isNew ? "جديد" : "قديم"}
                </Text>
                <Link href={`${router.asPath}/${id}`}>
                  <Button variant="link">التفاصيل</Button>
                </Link>
              </Flex>
            ),
          },
        ]}
        data={requests}
        onNext={goToNextPage}
        onPrev={goToPreviousPage}
      />
    </div>
  )
}

const RequestsPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RequestsList />
      </Suspense>
    </div>
  )
}

RequestsPage.getLayout = (page) => <AdminLayout title={"Requests"}>{page}</AdminLayout>

export default RequestsPage