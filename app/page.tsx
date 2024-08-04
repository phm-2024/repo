'use client'
import Password from '../components/Password'
import Document from '../components/Document'
import { useState } from 'react'
import LoadData from '@/components/LoadData'

export default function Home() {
  const [passkey, setPasskey] = useState('')
  const [activeComponent, setActiveComponent] = useState('')
  const [loadDoc, setLoadDoc] = useState(false)

  // console.log(activeComponent)

  const renderComponent = () => {
    if (activeComponent === 'New') {
      return (
        <>
          {passkey === '' ? (
            <Password setPasskey={setPasskey} />
          ) : (
            <Document
              docTitle={'Double Click to rename'}
              passkey={passkey}
              setActiveComponent={setActiveComponent}
            />
          )}
        </>
      )
    } else if (activeComponent === 'LoadData') {
      return (
        <LoadData
          setActiveComponent={setActiveComponent}
          setLoadDoc={setLoadDoc}
          loadDoc={loadDoc}
        />
      )
    }
    return null
  }

  // console.log(activeComponent)

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="px-5 py-2"
          onClick={() => {
            setActiveComponent('New')
            setPasskey('')
          }}
        >
          NEW NOTES
        </button>
        <button
          className="px-5 py-2"
          onClick={() => {
            setActiveComponent('LoadData')
            setLoadDoc(false)
          }}
        >
          LOAD NOTES
        </button>
      </div>
      {renderComponent()}
    </div>
  )
}
