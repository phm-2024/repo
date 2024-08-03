import { useState, FormEvent } from 'react'
import DisappearingText from './DisappearingText'

interface Props {
  docTitle: string
  passkey: string
}

export default function Document({ docTitle, passkey }: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [inputId, setInputId] = useState('')
  const [input, setInput] = useState('')
  const [title, setTitle] = useState(docTitle)
  const [focus, setFocus] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function createNotes(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

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
      setSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={createNotes}>
        {inputId.length !== 5 && (
          <input
            className="border-solid border-2 border-indigo-600"
            onChange={(e) => setInputId(e.target.value)}
            value={inputId}
            placeholder="input a 5-digit number"
          />
        )}
        {editTitle ? (
          <>
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
          </>
        ) : (
          <>
            <label
              className="border-solid border-2 border-indigo-600"
              onDoubleClick={() => {
                setEditTitle(true)
                setTitle('')
              }}
            >
              {title}
            </label>
          </>
        )}
        <div onClick={() => setFocus(true)}>
          <DisappearingText text={input} password={passkey} />
        </div>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border-solid border-2 border-indigo-600"
          placeholder="Document"
          style={{ color: 'white', border: 'none' }}
          autoFocus={focus}
        />
        <button type="submit">Save notes</button>
      </form>
    </>
  )
}
