'use client'
import { useEffect, useState } from 'react'
import DisappearingText from './DisappearingText'

interface Form {
  id: string
  file: string
  password: string
}
interface Props {
  input: Form
}

export const NotesById = ({ input }: Props) => {
  const [notes, setNotes] = useState<Note[]>()
  const [loading, setLoading] = useState(true)

  const [fileName, setFileName] = useState(false)
  const [password, setPassword] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/notes/${input.id}`)

        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects - ${response.status} ${response.statusText}`
          )
        }
        const data = await response.json()

        if (data[0].file_name == input.file) {
          setFileName(true)
        }

        if (data[0].password == input.password) {
          setPassword(true)
        }

        setNotes(data)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (!loading && notes) {
    const noteBits = notes[0].notes.split('\n')

    if (fileName) {
      return (
        <>
          <DisappearingText text={notes[0].notes} password={input.password} />
          <h1>Below are your notes</h1>
          {/* <h1>{notes[0].file_name}</h1>
          {noteBits.map((line, i) => (
            <div key={i}>
              <p>{line}</p>
              <br />
            </div>
          ))} */}
        </>
      )
    } else if (!password) {
      return <div>wrong password 👅</div>
    } else if (!fileName) {
      return <div>wrong file name 👅</div>
    } else {
      return <div>something's wrong👅</div>
    }
  }
}
