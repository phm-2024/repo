'use client'
import { useEffect, useState, ChangeEvent } from 'react'
import DisappearingText from './DisappearingText'

interface Props {
  id: string
  docTitle: string
  passkey: string
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>
}

export default function NotesById({
  id,
  docTitle,
  passkey,
  setActiveComponent,
}: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [inputId, setInputId] = useState('')
  const [input, setInput] = useState('')
  const [title, setTitle] = useState(docTitle)
  const [notes, setNotes] = useState<Note[]>()
  const [loading, setLoading] = useState(true)
  const [focus, setFocus] = useState(false)
  // const [fileName, setFileName] = useState(false)
  const [inputPw, setInputPw] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`)

        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects - ${response.status} ${response.statusText}`
          )
        }
        const data = await response.json()

        setTitle(data[0].file_name)

        if (data[0].password == passkey) {
          setInputPw(true)
        }

        setNotes(data)
        setInput(data[0].notes)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
    } catch (error) {
      console.log(error)
    } finally {
      setActiveComponent('')
    }
  }

  return (
    <>
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
      <div
        onClick={() => {
          document.getElementById('textBox')?.focus()
        }}
        className="w-[35rem] min-h-64 h-fit p-4 pt-10 break-words bg-amber-200 shadow-3xl"
      >
        <DisappearingText text={input} password={passkey} />
      </div>
      <section className="blank">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          // className="border-solid border-2 border-indigo-600"
          placeholder="Write your notes here"
          autoFocus={true}
          id="textBox"
          // maxLength={500}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setInput(input + '♡')
            }
          }}
        />
        <button onClick={createNotes}>Save notes</button>
      </section>
    </>
  )
}
