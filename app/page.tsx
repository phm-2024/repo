'use client'
import Password from '../components/Password'
import Document from '../components/Document'
import { useState } from 'react'
import LoadData from '@/components/LoadData'

export default function Home() {
  const [passkey, setPasskey] = useState('')
  const [activeComponent, setActiveComponent] = useState('')
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
      return <LoadData setActiveComponent={setActiveComponent} />
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
            activeComponent === 'New'
              ? setActiveComponent('')
              : setActiveComponent('New')
          }}
        >
          NEW
        </button>
        <button
          className="px-5 py-2"
          onClick={() => {
            activeComponent === 'LoadData'
              ? setActiveComponent('')
              : setActiveComponent('LoadData')
          }}
        >
          LOAD
        </button>
      </div>
      {renderComponent()}
    </div>
  )
}
