import React, { useCallback, useState } from "react"
import { Box } from "theme-ui"
import { useDropzone } from "react-dropzone"
import { ClipLoader } from "react-spinners"
import handleReadingFile from "app/utils/fileReader"

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
      const formData = { file: {} }

      try {
        setFetching(true)
        const resFiles: string[] = []

        // reslove all file if multiple true
        if (multiple) {
          await Promise.all([
            ...acceptedFiles.map(async (file) => {
              const fileInfo = await handleReadingFile(file)
              formData.file = fileInfo
              return fetcher(formData)
                .then((res) => res.json())
                .then((res) => resFiles.push(res.data.url))
                .catch((err) => console.log(err))
            }),
          ])
        }
        // reslove a single file only
        else {
          const fileInfo = await handleReadingFile(acceptedFiles[0])
          formData.file = fileInfo
          const file = await fetcher(formData).then((res) => res.json())
          resFiles.push(file.data.url)
          setImage(URL.createObjectURL(acceptedFiles[0]))
        }
        onSuccess(multiple ? resFiles : resFiles[0])
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
          {image &&
            !multiple &&
            (isImage ? (
              <img
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
            ) : (
              <video src={image}>
                <track kind="captions" />
              </video>
            ))}
        </div>
      </Box>
    </>
  )
}

MyDropzone.defaultProps = {
  accept: "image/*",
}

const END_POINT = `/api/upload/`
type UploadCloudinaryType = {
  onChange(arg0: string | string[]): any
  disabled?: boolean
  multiple?: boolean

  accept?: "image/*" | "video/*" | ".pdf"
}

const fetcher = (payload) =>
  fetch(END_POINT, {
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
    },
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
