import { turso } from '@/utils/database'

export const POST = async (req: Request) => {
  const { user_id, password, file_name, notes } = await req.json()

  try {
    const newNote = await turso.execute(
      `INSERT INTO notes (user_id, password, file_name, notes) VALUES(${user_id},${password},${file_name},${notes})`
    )

    return new Response(JSON.stringify(newNote), { status: 201 })
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
