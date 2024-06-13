import { NextRequest, NextResponse } from 'next/server';
import { getTodos, insertTodo } from '@/lib/tododb';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  const todos = await getTodos();
  return NextResponse.json(todos);
}
export async function POST(request: NextRequest) {
  const todo = await request.json();
  await insertTodo(todo);
  return NextResponse.json({state: 200});
}
