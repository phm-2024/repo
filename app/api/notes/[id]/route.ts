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
