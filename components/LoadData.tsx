'use client'

import { useState } from 'react'
import NotesById from './NotesById'

interface Props {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>
  setLoadDoc: React.Dispatch<React.SetStateAction<boolean>>
  loadDoc: boolean
}
interface Form {
  id: string
  file: string
  password: string
}

export default function LoadData({
  setActiveComponent,
  setLoadDoc,
  loadDoc,
}: Props) {
  const [formInputs, setformInputs] = useState<Form>({
    id: '',
    file: '',
    password: '',
  })

  const [form, setForm] = useState<Form>({
    id: '',
    file: '',
    password: '',
  })

  const [sendForm, setSendForm] = useState<Form>({
    id: '',
    file: '',
    password: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setformInputs(form)
    setSendForm(form)
    setForm({ id: '', file: '', password: '' })
    setLoadDoc(true)
  }

  return (
    <>
      {loadDoc ? (
        <NotesById
          id={sendForm.id}
          docTitle={sendForm.file}
          passkey={sendForm.password}
          setActiveComponent={setActiveComponent}
        />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <input
            onChange={handleChange}
            name="id"
            value={form.id}
            placeholder="Enter Id"
            className="border-solid border-2 border-indigo-600"
          />
          <input
            onChange={handleChange}
            name="password"
            value={form.password}
            placeholder="Enter password"
            className="border-solid border-2 border-indigo-600"
          />
          <button type="submit">Load document</button>
        </form>
      )}
    </>
  )
}
