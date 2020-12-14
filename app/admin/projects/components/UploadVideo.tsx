import MediaWidthTextField from "app/admin/components/MediaWidthTextField"
import LabeledTextField from "app/components/LabeledTextField"
import React, { useState } from "react"
import { Flex, Label, Radio } from "theme-ui"

export default function UploadVideo(props) {
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
          name="constructingUpdateVideo"
          label="نص مشاركة فيديو اليوتيوب  لتحديثات البناء "
        />
      ) : (
        <>
          <MediaWidthTextField
            name="constructingUpdateVideo"
            accept="video/*"
            label="فيديو تحديثات البناء"
          />

          <MediaWidthTextField
            name="constructingUpdatePrview"
            label="صورة عرض لفيديو تحديثات البناء"
          />
        </>
      )}
    </>
  )
}
