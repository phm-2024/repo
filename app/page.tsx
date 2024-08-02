'use client'
import Password from '@/Components/Password'
import Document from '@/Components/Document'
import { useState } from 'react'

export default function Home() {
  const [passkey, setPasskey] = useState('')

  return (
    <>
      {passkey === '' ? <Password setPasskey={setPasskey} /> : <Document />}
      <>{passkey}</>
    </>
  )
}
