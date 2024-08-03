'use client'
import { useEffect, useState } from 'react'

export default function Document() {
  const [notes, setNotes] = useState()
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

        setNotes(data)
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
      <p>hello</p>
    </>
  )
}
