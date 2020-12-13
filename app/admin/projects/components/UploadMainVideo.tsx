import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import LabeledTextField from "app/components/LabeledTextField"
import React, { useState } from "react"
import { Flex, Label, Radio } from "theme-ui"

export default function UploadMainVideo(props) {
  const [youtube, setYoutube] = useState(true)

  return (
    <>
      <Flex>
        <Label>
          <Radio
            onClick={() => setYoutube(true)}
            name="dark-mode"
            value="true"
            defaultChecked={youtube}
          />
          فيديو عبر اليوتويب
        </Label>
        <Label>
          <Radio onClick={() => setYoutube(false)} name="dark-mode" value="false" />
          فيديو عبر الموقع
        </Label>
      </Flex>
      {youtube ? (
        <LabeledTextField
          placeholder="https://www.youtube.com/embed/XN5p4EWnOEk"
          name="mainVideo"
          label="نص رابط فيديو اليوتويب للمشروع"
        />
      ) : (
        <>
          <MediaWidthTextField name="mainVideo" accept="video/*" label="فيديو المشروع الرئيسي" />

          <MediaWidthTextField name="mainVideoPrview" label="صورة عرض للفيديو الرئيسي" />
        </>
      )}
    </>
  )
}
