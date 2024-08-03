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
      {/* <form onSubmit={submission}> */}
      <DisappearingText text={input} />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="border-solid border-2 border-indigo-600"
        placeholder="Document"
      />
      {/* <button type="submit">Submit</button> */}
      {/* </form> */}
      {/* <br /> */}
    </>
  )
}
