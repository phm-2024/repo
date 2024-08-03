'use client'
import { useEffect, useState } from 'react'

interface Form {
  id: number
  file: string
  password: string
}

interface Props {
  input: Form
}

export default function Notes({ input }: Props) {
  const [notes, setNotes] = useState<Note[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/notes')
        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects - ${response.status} ${response.statusText}`
          )
        }
        const data = await response.json()
        console.log(data)
        console.log(data[0].password)

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
    return (
      <>
        <h1>Bellow are your notes</h1>
        <p>{notes[0].notes}</p>
      </>
    )
  }
}
