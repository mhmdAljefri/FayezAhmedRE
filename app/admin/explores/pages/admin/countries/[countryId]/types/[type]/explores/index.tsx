import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage, useMutation } from "blitz"
import getExplores from "app/admin/explores/queries/getExplores"
import { Explore } from "@prisma/client"
import DynamicTable from "app/components/Tables/DynamicTable"
import { Image, Button } from "theme-ui"
import Action from "app/admin/components/Action"
import deleteExplore from "app/admin/explores/mutations/deleteExplore"

const ITEMS_PER_PAGE = 100

export const ExploresList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const countryId = useParam("countryId", "number")
  const type = useParam("type", "string") as Explore["type"]

  const [deleteExploreMutation] = useMutation(deleteExplore)
  const [{ explores, hasMore }, { refetch }] = usePaginatedQuery(getExplores, {
    where: { country: { id: countryId }, type: { equals: type } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={[
        {
          key: "id",
          name: "",
        },
        {
          render: ({ image }) => <Image src={image} sx={{ width: 100 }} />,
          name: "",
        },
        { key: "title", name: "العنوان" },
        {
          name: "",
          render: ({ id }) => (
            <Action
              id={id}
              onDelete={() => deleteExploreMutation({ where: { id } }).then(() => refetch())}
            />
          ),
        },
      ]}
      data={explores}
      onNext={goToNextPage}
      onPrev={goToPreviousPage}
      hasMore={hasMore}
    />
  )
}

const ExploresPage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")
  const type = useParam("type") as Explore["type"]

  return (
    <div>
      <p>
        <Link href={`/admin/countries/${countryId}/types/${type}/explores/new`}>
          <Button>انشاء صفحة</Button>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ExploresList />
      </Suspense>
    </div>
  )
}

ExploresPage.getLayout = (page) => <AdminLayout title={"Explores"}>{page}</AdminLayout>

export default ExploresPage
