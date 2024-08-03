import { useState } from 'react'
import DisappearingText from './DisappearingText'

interface Props {
  id: number
  docTitle: string
}

export default function Document({ id, docTitle }: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [input, setInput] = useState('')
  const [title, setTitle] = useState(docTitle)

  return (
    <>
      <h1>{id}</h1>
      {editTitle ? (
        <>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder={docTitle}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                setEditTitle(false)
              }
            }}
            autoFocus={true}
          />
        </>
      ) : (
        <>
          <label
            onDoubleClick={() => {
              setEditTitle(true)
              setTitle('')
            }}
          >
            {title}
          </label>
        </>
      )}
      <DisappearingText text={input} />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="border-solid border-2 border-indigo-600"
        placeholder="Document"
        style={{ color: 'white', border: 'none' }}
      />
    </>
  )
}
