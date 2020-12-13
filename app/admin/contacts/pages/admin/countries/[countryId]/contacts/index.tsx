import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage } from "blitz"
import getContacts from "app/admin/contacts/queries/getContacts"

const ITEMS_PER_PAGE = 100

export const ContactsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const countryId = useParam("countryId", "number")
  const [{ contacts, hasMore }] = usePaginatedQuery(getContacts, {
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
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link href={`/admin/countries/${countryId}/contacts/${contact.id}`}>
              <a>{contact.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ContactsPage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")

  return (
    <div>
      <p>
        <Link href={`/admin/countries/${countryId}/contacts/new`}>
          <a>Create Contact</a>
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
