// import RichTextEditor from "react-rte"
import SunEditor from "suneditor-react"

type ReactReachTextEditorProps = {
  onChange: (value: string) => any
  value?: any
}
export default function ReactReachTextEditor({ onChange, value }: ReactReachTextEditorProps) {
  const handleChange = (textValue) => {
    if (onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      onChange(textValue)
    }
  }

  return <SunEditor setContents={value} onChange={handleChange} />
}
