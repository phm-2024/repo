'use client'
import { ReactEventHandler, useState } from 'react'

export default function Title() {
  const [form, setForm] = useState('')
  const [title, setTitle] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTitle(form)
    setForm('')
  }

  return (
    <>
      {title ? (
        <span className="text-indigo-600 text-4xl italic mb-4">{title}</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setForm(e.target.value)}
            value={form}
            placeholder="Put a title"
            className="border-solid border-2 border-indigo-600"
          />
          <button type="submit">Save</button>
        </form>
      )}
    </>
  )
}
