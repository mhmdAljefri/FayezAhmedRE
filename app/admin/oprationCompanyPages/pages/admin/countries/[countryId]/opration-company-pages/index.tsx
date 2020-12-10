import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage } from "blitz"
import getOprationCompanyPages from "app/admin/oprationCompanyPages/queries/getOprationCompanyPages"
import { Button } from "theme-ui"

const ITEMS_PER_PAGE = 100

export const OprationCompanyPagesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const countryId = useParam("countryId", "number")
  const [{ oprationCompanyPages, hasMore }] = usePaginatedQuery(getOprationCompanyPages, {
    where: { country: { id: countryId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {oprationCompanyPages.map((oprationCompanyPage) => (
          <li key={oprationCompanyPage.id}>{oprationCompanyPage.title}</li>
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

const OprationCompanyPagesPage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")

  return (
    <div>
      <p>
        <Link href={`/admin/countries/${countryId}/opration-company-pages/new`}>
          <Button>اضافة شركة عاملة</Button>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <OprationCompanyPagesList />
      </Suspense>
    </div>
  )
}

OprationCompanyPagesPage.getLayout = (page) => (
  <AdminLayout title={"OprationCompanyPages"}>{page}</AdminLayout>
)

export default OprationCompanyPagesPage
