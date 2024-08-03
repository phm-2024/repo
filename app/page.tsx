'use client'
import Password from '../components/Password'
import Document from '../components/Document'
import { useState } from 'react'

export default function Home() {
  const [passkey, setPasskey] = useState('')

  return (
    <>
      {passkey === '' ? (
        <Password setPasskey={setPasskey} />
      ) : (
        <Document id={0} docTitle={'Double Click to rename'} />
      )}
      {/* <>{passkey}</> */}
    </>
  )
}
