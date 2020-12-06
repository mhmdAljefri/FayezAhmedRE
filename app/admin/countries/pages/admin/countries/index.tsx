import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getCountries from "app/admin/countries/queries/getCountries"
import DynamicTable from "app/components/Tables/DynamicTable"
import Action from "app/admin/components/Action"
import { Country } from "@prisma/client"
import { Box, Link as ThemeLink } from "theme-ui"

const ITEMS_PER_PAGE = 100

const HEADERS = [
  { name: "", key: "id" },
  { name: "الدولة", key: "name" },
  {
    name: "",
    render: ({ id }: Country) => (
      <Box>
        <Link passHref href={`/admin/countries/${id}/cities`}>
          <ThemeLink>المدن</ThemeLink>
        </Link>
      </Box>
    ),
  },
  {
    name: "",
    render: ({ id }: Country) => <Action id={id} />,
  },
]

export const CountriesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ countries, hasMore }] = usePaginatedQuery(getCountries, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <DynamicTable
        headers={HEADERS}
        hasMore={hasMore}
        data={countries || []}
        onNext={goToNextPage}
        onPrev={goToPreviousPage}
      />
    </div>
  )
}

const CountriesPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>تحميل...</div>}>
        <CountriesList />
      </Suspense>
    </div>
  )
}

CountriesPage.getLayout = (page) => <AdminLayout title={"البدان"}>{page}</AdminLayout>

export default CountriesPage
