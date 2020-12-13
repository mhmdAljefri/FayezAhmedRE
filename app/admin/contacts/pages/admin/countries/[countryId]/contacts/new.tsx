import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useMutation, useParam, BlitzPage } from "blitz"
import createContact from "app/admin/contacts/mutations/createContact"
import ContactForm from "app/admin/contacts/components/ContactForm"
import { toast } from "react-toastify"

const NewContactPage: BlitzPage = () => {
  const router = useRouter()
  const countryId = useParam("countryId", "number") as number
  const [createContactMutation] = useMutation(createContact)

  return (
    <div>
      <h1>اضافة جهة اتصال</h1>

      <ContactForm
        initialValues={{}}
        onSubmit={async (data) => {
          try {
            await createContactMutation({ data, countryId })
            toast.success("تمت العملية!")
            router.push(`/admin/countries/${countryId}/contacts/`)
          } catch (error) {
            alert("Error creating contact " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href={`/countries/${countryId}/contacts`}>
          <a>Contacts</a>
        </Link>
      </p>
    </div>
  )
}

NewContactPage.getLayout = (page) => <AdminLayout title={"Create New Contact"}>{page}</AdminLayout>

export default NewContactPage
