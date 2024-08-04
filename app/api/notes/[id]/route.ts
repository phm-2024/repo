import { turso } from '@/utils/database'

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params

    const notes = await turso.execute(
      `SELECT * FROM notes WHERE user_id = ${id}`
    )

    return new Response(JSON.stringify(notes.rows), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch projects', { status: 500 })
  }
}

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    const { file_name, notes } = await req.json()

    const query = 'UPDATE notes SET file_name = ?, notes = ? WHERE user_id = ?'
    const args = [file_name, notes, id]

    const result = await turso.execute({ sql: query, args })

    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch projects', { status: 500 })
  }
}
