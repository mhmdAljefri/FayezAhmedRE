import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage, useMutation } from "blitz"
import getContacts from "app/admin/contacts/queries/getContacts"
import DynamicTable from "app/components/Tables/DynamicTable"
import { Button } from "theme-ui"
import Action from "app/admin/components/Action"
import deleteContact from "app/admin/contacts/mutations/deleteContact"

const ITEMS_PER_PAGE = 100

export const ContactsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const countryId = useParam("countryId", "number")
  const [deleteContactMutation] = useMutation(deleteContact)
  const [{ contacts, hasMore }, { refetch }] = usePaginatedQuery(getContacts, {
    where: { country: { id: countryId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <DynamicTable
        headers={[
          { key: "id", name: "" },
          { key: "name", name: "الاسم" },
          {
            render: ({ id }) => (
              <Action
                id={id}
                onDelete={() => deleteContactMutation({ where: { id } }).then(() => refetch())}
              />
            ),
            name: "",
          },
        ]}
        data={contacts}
        onNext={goToNextPage}
        onPrev={goToPreviousPage}
        hasMore={hasMore}
      />
    </div>
  )
}

const ContactsPage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")

  return (
    <div>
      <p>
        <Link href={`/admin/countries/${countryId}/contacts/new`}>
          <Button>اضافة جهة اتصال</Button>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ContactsList />
      </Suspense>
    </div>
  )
}

ContactsPage.getLayout = (page) => <AdminLayout title={"Contacts"}>{page}</AdminLayout>

export default ContactsPage
