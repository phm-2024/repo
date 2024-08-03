import { useState } from 'react'

interface Props {
  setPasskey: React.Dispatch<React.SetStateAction<string>>
}

export default function Password({ setPasskey }: Props) {
  const [password, setPassword] = useState('')

  function submission() {
    setPasskey(password)
  }

  return (
    <>
      <form onSubmit={submission}>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border-solid border-2 border-indigo-600"
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
