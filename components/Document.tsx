import { useEffect, useState } from 'react'
import DisappearingText from './DisappearingText'

interface Props {
  id: number
  docTitle: string
  password: string
}

export default function Document({ id, docTitle, password }: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [input, setInput] = useState('')
  const [title, setTitle] = useState(docTitle)
  const [notes, setNotes] = useState<Note[]>()
  const [loading, setLoading] = useState(true)
  const [focus, setFocus] = useState(false)
  const [fileName, setFileName] = useState(false)
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

        if (data[0].file_name == docTitle) {
          setFileName(true)
        }

        if (data[0].password == password) {
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
      <div onClick={() => setFocus(true)}>
        <DisappearingText text={input} password={password} />
      </div>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="border-solid border-2 border-indigo-600"
        placeholder="Document"
        style={{ color: 'white', border: 'none' }}
        autoFocus={focus}
      />
    </>
  )
}
