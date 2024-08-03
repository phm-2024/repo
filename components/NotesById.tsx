'use client'
// import { useEffect, useState } from 'react'
// import DisappearingText from './DisappearingText'

// interface Form {
//   id: string
//   file: string
//   password: string
// }
// interface Props {
//   input: Form
// }

// export const NotesById = ({ input }: Props) => {
//   const [notes, setNotes] = useState<Note[]>()
//   const [loading, setLoading] = useState(true)

//   const [fileName, setFileName] = useState(false)
//   const [password, setPassword] = useState(false)

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(`/api/notes/${input.id}`)

//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch projects - ${response.status} ${response.statusText}`
//           )
//         }
//         const data = await response.json()

//         if (data[0].file_name == input.file) {
//           setFileName(true)
//         }

//         if (data[0].password == input.password) {
//           setPassword(true)
//         }

//         setNotes(data)

//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching projects:', error)
//         setLoading(false)
//       }
//     }

//     fetchProjects()
//   }, [])

//   if (!loading && notes) {
//     const noteBits = notes[0].notes.split('\n')

//     if (fileName) {
//       return (
//         <>
//           <DisappearingText text={notes[0].notes} password={input.password} />
//           <h1>Below are your notes</h1>
//           {/* <h1>{notes[0].file_name}</h1>
//           {noteBits.map((line, i) => (
//             <div key={i}>
//               <p>{line}</p>
//               <br />
//             </div>
//           ))} */}
//         </>
//       )
//     } else if (!password) {
//       return <div>wrong password 👅</div>
//     } else if (!fileName) {
//       return <div>wrong file name 👅</div>
//     } else {
//       return <div>something's wrong👅</div>
//     }
//   }
// }

import { useEffect, useState, ChangeEvent } from 'react'
import DisappearingText from './DisappearingText'

interface Props {
  id: string
  docTitle: string
  passkey: string
}

export default function NotesById({ id, docTitle, passkey }: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [inputId, setInputId] = useState('')
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
      <button onClick={() => createNotes}>Save notes</button>
    </>
  )
}
