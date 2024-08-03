'use client'
import { useEffect, useState } from 'react'

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
        console.log(data[0].notes)

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
    console.log(noteBits)

    return (
      <>
        <h1>Below are your notes</h1>
        <h1>{notes[0].file_name}</h1>
        {noteBits.map((line, i) => (
          <div key={i}>
            <p>{line}</p>
            <br />
          </div>
        ))}
      </>
    )
  }
}
