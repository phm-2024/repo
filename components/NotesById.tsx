'use client'
import { useEffect, useState, ChangeEvent } from 'react'
import DisappearingText from './DisappearingText'

interface Props {
  id: string
  docTitle: string
  passkey: string
  setLoadDoc: React.Dispatch<React.SetStateAction<boolean>>
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>
}

export default function NotesById({
  id,
  docTitle,
  passkey,
  setLoadDoc,
  setActiveComponent,
}: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [inputId, setInputId] = useState('')
  const [input, setInput] = useState('')
  const [title, setTitle] = useState(docTitle)
  const [notes, setNotes] = useState<Note[]>()
  const [loading, setLoading] = useState(true)
  const [oldTitle, setOldTitle] = useState(docTitle)
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

        if (data[0].password != passkey) {
          setLoadDoc(false)
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
    title === '' && setTitle(oldTitle)
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
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
            placeholder={oldTitle}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                title === '' && setTitle(oldTitle)
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
              setOldTitle(title)
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
          title === '' && setTitle(oldTitle)
          setEditTitle(false)
        }}
        className="w-[35rem] min-h-64 h-fit p-4 pt-10 break-words bg-amber-200 shadow-3xl"
      >
        <DisappearingText text={input} password={passkey} />
      </div>
      <button onClick={createNotes}>Update Notes</button>
      <section className="blank">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          spellCheck="false"
          autoFocus={true}
          id="textBox"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setInput(input + '♡')
            }
          }}
        />
      </section>
    </>
  )
}
