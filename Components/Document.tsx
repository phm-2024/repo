import { useState } from 'react'
import DisappearingText from './DisappearingText'

export default function Document() {
  const [input, setInput] = useState('')
  const [form, setForm] = useState('')

  const [disappear, setDisappear] = useState(false)
  console.log(input)

  function submission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setInput(form)
    setForm('')
    setDisappear((prev) => !prev)
  }

  return (
    <>
      <form onSubmit={submission}>
        <input
          onChange={(e) => setForm(e.target.value)}
          value={form}
          className="border-solid border-2 border-indigo-600"
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      {disappear && <DisappearingText text={input} />}
      {/* <p>{input}</p> */}
    </>
  )
}
