import type { NextApiRequest, NextApiResponse } from 'next'
import { getTodo, updateTodo, deleteTodo } from '@/lib/tododb';

export const config = {
    api: {
      externalResolver: true,
    },
}
  
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const id = Number(request.query.id);
    switch(request.method) {
        case 'GET':
            const todo = await getTodo(id);
            response.status(200).json(todo);
            break;
        case "PUT":
            await updateTodo(id, request.body);
            response.status(200)
            break;
        case "DELETE":
            await deleteTodo(id);     
            response.status(200);
            break;     
    }
}
