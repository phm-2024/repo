'use client'
import Password from '@/components/Password'
import Document from '@/components/Document'
import { useState } from 'react'
import Title from '@/components/Title'

export default function Home() {
  const [passkey, setPasskey] = useState('')

  return (
    <>
      <Title />
      {passkey === '' ? <Password setPasskey={setPasskey} /> : <Document />}
      <>{passkey}</>
    </>
  )
}
