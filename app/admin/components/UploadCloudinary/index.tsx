import React, { useCallback, useState } from "react"
import { Box, Image } from "theme-ui"
import { useDropzone } from "react-dropzone"
import { ClipLoader } from "react-spinners"

type MyDropzoneType = {
  onSuccess(arg0: string | string[]): any
  disabled?: boolean
  multiple?: boolean

  accept?: "image/*" | "video/*" | ".pdf"
}

function MyDropzone({ onSuccess, multiple, accept }: MyDropzoneType) {
  const [image, setImage] = useState("")
  const [fetching, setFetching] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const formData = new FormData()
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string)
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string)
      formData.append("unique_filename", "true")
      try {
        setFetching(true)
        const resFiles: string[] = []
        if (multiple) {
          await Promise.all([
            ...acceptedFiles.map((file) => {
              formData.delete("file")
              formData.append("file", file)
              return fetcher(formData)
                .then((res) => res.json())
                .then((res) => resFiles.push(res.url))
                .catch((err) => console.log(err))
            }),
          ])
        } else {
          formData.append("file", acceptedFiles[0])
          const file = await fetcher(formData).then((res) => res.json())
          resFiles.push(file.url)
        }
        onSuccess(multiple ? resFiles : resFiles[0])
        setImage(URL.createObjectURL(acceptedFiles[0]))
      } catch (error) {
      } finally {
        setFetching(false)
      }
    },
    [onSuccess, multiple]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple, accept })

  const isImage = !accept || accept === "image/*"

  return (
    <>
      <Box
        sx={{
          variant: "forms.field",
          padding: 1,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div style={{ position: "relative", height: 60, display: "flex", alignItems: "center" }}>
          <p>قم بادراج الملف او بالضغط داخل المربع</p>
          {fetching && (
            <Box sx={{ position: "absolute", left: 20, top: 20, zIndex: 1 }}>
              <ClipLoader />
            </Box>
          )}
          {image && !multiple && (
            <Image
              as={isImage ? "img" : "video"}
              style={{
                opacity: fetching ? 0.5 : 1,
                objectFit: "contain",
                width: 50,
                position: "absolute",
                top: 15,
                left: 15,
              }}
              src={image}
              alt="..."
            />
          )}
        </div>
      </Box>
    </>
  )
}

MyDropzone.defaultProps = {
  accept: "image/*",
}

const END_POINT = `https://api.cloudinary.com/v1_1/${
  process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string
}/upload`

type UploadCloudinaryType = {
  onChange(arg0: string | string[]): any
  disabled?: boolean
  multiple?: boolean

  accept?: "image/*" | "video/*" | ".pdf"
}

const fetcher = (payload) =>
  fetch(END_POINT, {
    body: payload,
    method: "POST",
  })

export default function UploadCloudinary({
  onChange,
  disabled,
  accept,
  multiple,
}: UploadCloudinaryType) {
  return (
    <>
      <MyDropzone disabled={disabled} accept={accept} multiple={multiple} onSuccess={onChange} />
    </>
  )
}
