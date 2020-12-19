import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import DynamicTable from "app/components/Tables/DynamicTable"
import getPropertyTypes from "app/admin/propert-types/queries/getPropertTypes"
import Action from "app/admin/components/Action"
import deletePropertyType from "app/admin/propert-types/mutations/deletePropertType"

const ITEMS_PER_PAGE = 100

export const PropertyTypesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deletePropertyMutation] = useMutation(deletePropertyType)
  const [{ propertyTypes, hasMore }, { refetch }] = usePaginatedQuery(getPropertyTypes, {
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
          name: "",
          key: "id",
        },
        { name: "النوع", key: "name" },
        {
          name: "النوع",
          render: ({ id }) => (
            <Action
              id={id}
              onDelete={() => deletePropertyMutation({ where: { id } }).then(() => refetch())}
            />
          ),
        },
      ]}
      data={propertyTypes}
      onNext={goToNextPage}
      hasMore={hasMore}
      onPrev={goToPreviousPage}
    />
  )
}

const PropertyTypesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/propert-types/new">
          <a>اضافة صنف</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PropertyTypesList />
      </Suspense>
    </div>
  )
}

PropertyTypesPage.getLayout = (page) => <AdminLayout title={"PropertyTypes"}>{page}</AdminLayout>

export default PropertyTypesPage
