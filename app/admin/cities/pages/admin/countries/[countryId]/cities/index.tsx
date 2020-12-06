import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage, useMutation } from "blitz"
import getCities from "app/admin/cities/queries/getCities"
import { Button, Flex } from "theme-ui"
import Action from "app/admin/components/Action"
import deleteCity from "app/admin/cities/mutations/deleteCity"

const ITEMS_PER_PAGE = 100

export const CitiesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const countryId = useParam("countryId", "number")
  const [deleteCityMutation] = useMutation(deleteCity)

  const [{ cities, hasMore }, { refetch }] = usePaginatedQuery(getCities, {
    where: { country: { id: countryId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const handleDelete = (id) => deleteCityMutation({ where: { id } }).then(() => refetch())
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            <Flex>
              <div>{city.name}</div>
              <Action onDelete={() => handleDelete(city.id)} id={city.id} />
            </Flex>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        التالي
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        السابق
      </button>
    </div>
  )
}

const CitiesPage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")

  return (
    <div>
      <p>
        <Link href={`/admin/countries/${countryId}/cities/new`}>
          <Button>اضافة مدينة</Button>
        </Link>
      </p>

      <Suspense fallback={<div>تحميل...</div>}>
        <CitiesList />
      </Suspense>
    </div>
  )
}

CitiesPage.getLayout = (page) => <AdminLayout title={"Cities"}>{page}</AdminLayout>

export default CitiesPage
