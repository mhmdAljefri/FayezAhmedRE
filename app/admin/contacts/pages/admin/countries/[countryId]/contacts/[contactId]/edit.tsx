import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getContact from "app/admin/contacts/queries/getContact"
import updateContact from "app/admin/contacts/mutations/updateContact"
import ContactForm from "app/admin/contacts/components/ContactForm"

export const EditContact = () => {
  const router = useRouter()
  const contactId = useParam("contactId", "number")
  const countryId = useParam("countryId", "number") as number
  const [contact, { setQueryData }] = useQuery(getContact, { where: { id: contactId } })
  const [updateContactMutation] = useMutation(updateContact)

  return (
    <div>
      <h1>Edit Contact {contact.id}</h1>
      <pre>{JSON.stringify(contact)}</pre>

      <ContactForm
        initialValues={contact}
        onSubmit={async (data) => {
          try {
            const updated = await updateContactMutation({
              where: { id: contact.id },
              data,
              countryId,
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/admin/countries/${countryId}/contacts/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing contact " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditContactPage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditContact />
      </Suspense>

      <p>
        <Link href={`/countries/${countryId}/contacts`}>
          <a>Contacts</a>
        </Link>
      </p>
    </div>
  )
}

EditContactPage.getLayout = (page) => <AdminLayout title={"Edit Contact"}>{page}</AdminLayout>

export default EditContactPage