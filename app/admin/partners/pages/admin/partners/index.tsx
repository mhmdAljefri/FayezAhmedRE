import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import getPartners from "app/admin/partners/queries/getPartners"
import DynamicTable from "app/components/Tables/DynamicTable"
import { Avatar, Button } from "theme-ui"
import Action from "app/admin/components/Action"
import deletePartner from "../../../mutations/deletePartner"

const ITEMS_PER_PAGE = 100

export const PartnersList = () => {
  const [deletPartnerMutation] = useMutation(deletePartner)
  const onDelete = async (id: number) => await deletPartnerMutation({ where: { id } })

  const HEADERS = [
    { name: "", key: "id" },
    { name: "", render: ({ image }) => <Avatar size={40} src={image} /> },
    { name: "الشريك", key: "name" },
    {
      name: "",
      render: ({ id }) => <Action id={id} onDelete={() => onDelete(id)} />,
    },
  ]
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ partners, hasMore }] = usePaginatedQuery(getPartners, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <DynamicTable
      headers={HEADERS}
      hasMore={hasMore}
      data={partners || []}
      onNext={goToNextPage}
      onPrev={goToPreviousPage}
    />
  )
}

const PartnersPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/admin/partners/new">
          <Button>اضافة شريك</Button>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PartnersList />
      </Suspense>
    </div>
  )
}

PartnersPage.getLayout = (page) => <AdminLayout title={"Partners"}>{page}</AdminLayout>

export default PartnersPage
