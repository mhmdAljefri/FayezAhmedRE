import React, { useCallback, useState } from "react"
import { Box, Image } from "theme-ui"
import { useDropzone } from "react-dropzone"
import { ClipLoader } from "react-spinners"

type MyDropzoneType = {
  onSuccess(arg0: FormData): any
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
      formData.append("file", acceptedFiles[0])
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string)

      setImage(URL.createObjectURL(acceptedFiles[0]))

      try {
        setFetching(true)
        await onSuccess(formData)
      } catch (error) {
      } finally {
        setFetching(false)
      }
    },
    [onSuccess]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple, accept })

  const isImage = !accept || accept === "image/*"

  return (
    <>
      <Box
        sx={{
          variant: "forms.field",
          padding: 3,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div style={{ position: "relative", height: 150, display: "flex", alignItems: "center" }}>
          <p>قم بادراج الملف او بالضغط داخل المربع</p>
          {fetching && (
            <Box sx={{ position: "absolute", left: 70, top: 70, zIndex: 1 }}>
              <ClipLoader />
            </Box>
          )}
          {image && (
            <Image
              as={isImage ? "img" : "video"}
              style={{
                opacity: fetching ? 0.5 : 1,
                objectFit: "contain",
                width: 150,
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
  onChange(arg0: { url: string }): any
  disabled?: boolean
  multiple?: boolean

  accept?: "image/*" | "video/*" | ".pdf"
}

export default function UploadCloudinary({
  onChange,
  disabled,
  accept,
  multiple,
}: UploadCloudinaryType) {
  const handleUpload = (body: FormData) => {
    return fetch(END_POINT, {
      body: body,
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        onChange(res)
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <MyDropzone
        disabled={disabled}
        accept={accept}
        multiple={multiple}
        onSuccess={handleUpload}
      />
    </>
  )
}
