const handleFileSize = (bytes: number) => {
  const temp = bytes
  let tempString
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
  for (let i = 0; i < sizes.length; i += 1) {
    if (temp <= 1024) {
      return `${temp}  ${sizes[i]}`
    }
    tempString = parseFloat(`${temp / 1024}`).toFixed(2)
  }
  return `${tempString}  P`
}

type FileObject = {
  filename: string
  content_type: string
  size: string
  data: string | ArrayBuffer | null
}
export default function handleReadingFile(file: File): Promise<FileObject> {
  const reader = new FileReader()
  let fileInfo

  // Convert the file to base64 text
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    // on reader load somthing...
    reader.onload = () => {
      fileInfo = {
        filename: file.name,
        content_type: file.type,
        size: handleFileSize(file.size),
        data: reader.result,
      } as FileObject

      resolve(fileInfo)
    }
    reader.onerror = function (event) {
      reject("Failed to read file! " + reader.error)
      reader.abort() // (...does this do anything useful in an onerror handler?) I don't know :'(
    }
  })
}
