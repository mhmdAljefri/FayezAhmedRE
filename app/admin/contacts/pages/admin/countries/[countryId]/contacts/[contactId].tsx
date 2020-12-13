import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getContact from "app/admin/contacts/queries/getContact"
import deleteContact from "app/admin/contacts/mutations/deleteContact"

export const Contact = () => {
  const router = useRouter()
  const contactId = useParam("contactId", "number")
  const countryId = useParam("countryId", "number")
  const [contact] = useQuery(getContact, { where: { id: contactId } })
  const [deleteContactMutation] = useMutation(deleteContact)

  return (
    <div>
      <h1>Contact {contact.id}</h1>
      <pre>{JSON.stringify(contact, null, 2)}</pre>

      <Link href={`/admin/countries/${countryId}/contacts/${contact.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteContactMutation({ where: { id: contact.id } })
            router.push(`/countries/${countryId}/contacts`)
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowContactPage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")

  return (
    <div>
      <p>
        <Link href={`/countries/${countryId}/contacts`}>
          <a>Contacts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
    </div>
  )
}

ShowContactPage.getLayout = (page) => <Layout title={"Contact"}>{page}</Layout>

export default ShowContactPage
