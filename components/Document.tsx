import { useState } from 'react'
import DisappearingText from './DisappearingText'

interface Props {
  docTitle: string
  passkey: string
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>
}

export default function Document({
  docTitle,
  passkey,
  setActiveComponent,
}: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [inputId, setInputId] = useState('')
  const [input, setInput] = useState('')
  const [title, setTitle] = useState(docTitle)

  async function createNotes() {
    try {
      const res = await fetch('/api/notes/new', {
        method: 'POST',
        body: JSON.stringify({
          user_id: inputId,
          password: passkey,
          file_name: title,
          notes: input,
        }),
      })
      console.log({
        user_id: inputId,
        password: passkey,
        file_name: title,
        notes: input,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setActiveComponent('')
    }
  }

  return (
    <>
      {inputId.length !== 5 && (
        <input
          className="border-solid border-2 border-indigo-600"
          onChange={(e) => setInputId(e.target.value)}
          value={inputId}
          placeholder="input a 5-digit number"
        />
      )}
      {editTitle ? (
        <input
          className="border-solid border-2 border-indigo-600"
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
      ) : (
        <label
          className="border-solid border-2 border-indigo-600"
          onDoubleClick={() => {
            setEditTitle(true)
            setTitle('')
          }}
        >
          {title}
        </label>
      )}
      <div
        onClick={() => {
          document.getElementById('textBox')?.focus()
        }}
        className="w-96 h-64 break-words"
      >
        <DisappearingText text={input} password={passkey} />
      </div>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="border-solid border-2 border-indigo-600"
        placeholder="Document"
        style={{ color: 'white', border: 'none' }}
        id="textBox"
        autoFocus={true}
        maxLength={500}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setInput(input + '/n')
          }
        }}
      />
      <button onClick={createNotes}>Save notes</button>
    </>
  )
}
