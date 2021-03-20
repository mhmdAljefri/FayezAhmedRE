import React from "react"

import LoginForm from "app/auth/components/LoginForm"
import ReactModal, { Props as ReactModalProps } from "react-modal"

type Props = ReactModalProps & {
  onSuccess?: () => any
}
export default function LoginFormModal({ onSuccess, ...props }: Props) {
  return (
    <>
      <ReactModal
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            inset: "20% 20vw",
          },
        }}
        {...props}
      >
        <LoginForm onSuccess={onSuccess} />
      </ReactModal>
    </>
  )
}
