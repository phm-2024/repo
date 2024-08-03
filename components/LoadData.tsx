'use client'

import { useEffect, useState } from 'react'
import { NotesById } from './NotesById'

interface Form {
  id: string
  file: string
  password: string
}

export default function LoadData() {
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
    setForm({ id: '', file: '', password: '' })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="id"
          value={form.id}
          placeholder="Enter Id"
          className="border-solid border-2 border-indigo-600"
        />
        <input
          onChange={handleChange}
          name="file"
          value={form.file}
          placeholder="Enter file name"
          className="border-solid border-2 border-indigo-600"
        />
        <input
          onChange={handleChange}
          name="password"
          value={form.password}
          placeholder="Enter password"
          className="border-solid border-2 border-indigo-600"
        />
        <button type="submit">Load the doc</button>
        {formInputs.id.length > 0 && <NotesById input={formInputs} />}
      </form>
    </>
  )
}
