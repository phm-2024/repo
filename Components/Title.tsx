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
      {title ? <span>{title}</span> : <span></span>}
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setForm(e.target.value)}
          value={form}
          placeholder="Make a title of your note"
          className="border-solid border-2 border-indigo-600"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
