import { ChangeEvent, useState } from 'react'
import DisappearingText from './DisappearingText'

interface Props {
  // id: number
  docTitle: string
  passkey: string
}

export default function Document({ docTitle, passkey }: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [inputId, setInputId] = useState('')
  const [input, setInput] = useState('')
  const [title, setTitle] = useState(docTitle)
  const [submitting, setSubmitting] = useState(false)

  async function createNotes(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          user_id: inputId,
          password: passkey,
          file_name: title,
          notes: input,
        }),
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {inputId.length !== 5 && (
        <input
          onChange={(e) => setInputId(e.target.value)}
          value={inputId}
          placeholder="input a 5-digit number"
        />
      )}
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
      <button onClick={() => createNotes}>Save notes</button>
    </>
  )
}
