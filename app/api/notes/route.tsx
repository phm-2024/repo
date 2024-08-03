import { turso } from '@/utils/database'

export async function getAllNotes() {
  const notes = await turso.execute('SELECT * FROM notes')

  return notes.rows
}
