import { useState } from 'react'

export default function Document() {
  const [input, setInput] = useState('')
  console.log(input)

  function submission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setInput(input)
  }

  return (
    <>
      <form onSubmit={submission}>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border-solid border-2 border-indigo-600"
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <p>{input}</p>
    </>
  )
}
