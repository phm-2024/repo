'use client'

import { useState } from 'react'
import Notes from './Notes'

interface Form {
  id: number
  file: string
  password: string
}

export default function LoadData() {
  const data = { id: 1, file: 'file name', password: '1' }

  const [form, setForm] = useState<Form>({ id: 0, file: '', password: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
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
        <Notes input={form} />
      </form>
    </>
  )
}
