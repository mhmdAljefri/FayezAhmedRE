import { Suspense } from "react"
import AdminLayout from "app/layouts/AdminLayout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getExplore from "app/admin/explores/queries/getExplore"
import updateExplore from "app/admin/explores/mutations/updateExplore"
import ExploreForm from "app/admin/explores/components/ExploreForm"
import { toast } from "react-toastify"
import { Explore } from "@prisma/client"
import { Box, Button, Flex } from "theme-ui"
import useOnClickout from "app/hooks/useOnClickout"
import { EXPLOARE_TYPES_TEXT } from "app/constants"

export const EditExplore = () => {
  const router = useRouter()
  const exploreId = useParam("exploreId", "number")
  const countryId = useParam("countryId", "number")
  const type = useParam("type") as Explore["type"]

  const [explore, { setQueryData }] = useQuery(getExplore, { where: { id: exploreId } })
  const [updateExploreMutation] = useMutation(updateExplore)

  const { ref, open, setOpen } = useOnClickout()

  if (!countryId) return <div />
  return (
    <div>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <h1>تعديل على الصفحة {explore.id}</h1>

        <Box ref={ref} sx={{ position: "relative" }}>
          <Button onClick={() => setOpen(true)}>تعديل القائمة</Button>
          <Box sx={{ position: "absolute", opacity: open ? 1 : 0 }}>
            {Object.keys(EXPLOARE_TYPES_TEXT).map((exploreType: Explore["type"]) => (
              <Box
                key={exploreType}
                onClick={() =>
                  updateExploreMutation({
                    where: { id: explore.id },
                    data: { ...explore, type: exploreType },
                    countryId,
                  })
                }
                sx={{
                  p: 2,
                  backgroundColor: "background",
                  color: exploreType === explore.type ? "primary" : "text",
                }}
              >
                {EXPLOARE_TYPES_TEXT[exploreType]}
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>

      <ExploreForm
        initialValues={explore}
        onSubmit={async (data) => {
          try {
            const updated = await updateExploreMutation({
              where: { id: explore.id },
              data,
              countryId,
            })
            await setQueryData(updated)
            toast.success("تمت العملية!")
            router.push(`/admin/countries/${countryId}/types/${type}/explores/`)
          } catch (error) {
            console.log(error)
            alert("Error editing explore " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditExplorePage: BlitzPage = () => {
  const countryId = useParam("countryId", "number")
  const type = useParam("type") as Explore["type"]

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditExplore />
      </Suspense>

      <p>
        <Link href={`/admin/countries/${countryId}/types/${type}/explores/`}>
          <a>Explores</a>
        </Link>
      </p>
    </div>
  )
}

EditExplorePage.getLayout = (page) => <AdminLayout title={"Edit Explore"}>{page}</AdminLayout>

export default EditExplorePage
