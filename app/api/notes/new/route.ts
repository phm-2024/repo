import { turso } from '@/utils/database'

export const POST = async (req: Request) => {
  const { user_id, password, file_name, notes } = await req.json()
  // console.log({ user_id, password, file_name, notes })

  const query =
    'INSERT INTO notes (user_id, password, file_name, notes) VALUES (?,?,?,?)'

  const args = [user_id, password, file_name, notes]

  try {
    const result = await turso.execute({ sql: query, args })
    return new Response(JSON.stringify(result), { status: 201 })
  } catch (error) {
    return new Response('Failed to create a new note', { status: 500 })
  }
}
