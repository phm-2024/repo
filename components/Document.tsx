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
  const [oldTitle, setOldTitle] = useState(docTitle)

  async function createNotes() {
    title === '' && setTitle(oldTitle)
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
    } catch (error) {
      console.log(error)
    } finally {
      setActiveComponent('')
    }
  }

  return (
    <div className="flex flex-col items-center">
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
              title === '' && setTitle(oldTitle)
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
            setOldTitle(title)
            setTitle('')
          }}
        >
          {title}
        </label>
      )}
      <div
        onClick={() => {
          document.getElementById('textBox')?.focus()
          title === '' && setTitle(oldTitle)
          setEditTitle(false)
        }}
        className="w-[35rem] min-h-64 h-fit p-2 pt-4 break-words bg-amber-200"
      >
        <DisappearingText text={input} password={passkey} />
      </div>
      <button onClick={createNotes}>Save Notes</button>
      <section className="blank">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border-solid border-2 border-indigo-600"
          style={{ color: 'white', border: 'none' }}
          id="textBox"
          spellCheck="false"
          autoFocus={true}
          maxLength={500}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setInput(input + '♡')
            }
          }}
        />
      </section>
    </div>
  )
}
