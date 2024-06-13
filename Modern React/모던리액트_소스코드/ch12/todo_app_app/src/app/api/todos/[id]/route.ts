import { NextRequest, NextResponse } from 'next/server';
import { getTodo, updateTodo, deleteTodo } from '@/lib/tododb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, {params}: {params: {id: number}}) {
  const id = Number(params.id);
  const todo = await getTodo(id);
  return NextResponse.json(todo);
}
export async function PUT(request: NextRequest, {params}: {params: {id: number}}) {
  const id = Number(params.id);
  const todo = await request.json();
  await updateTodo(id, todo);
  return NextResponse.json({state: 200});
}
export async function DELETE(request: NextRequest, {params}: {params: {id: number}}) {
  const id = Number(params.id);
  await deleteTodo(id); 
  return NextResponse.json({state: 200});
}
