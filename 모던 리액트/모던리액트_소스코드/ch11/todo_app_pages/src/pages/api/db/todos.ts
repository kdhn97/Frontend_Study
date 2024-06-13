import type { NextApiRequest, NextApiResponse } from 'next'
import { getTodos, insertTodo } from '@/lib/tododb';

export const config = {
    api: {
      externalResolver: true,
    },
}
  
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    switch(request.method) {
        case 'GET':
            const todos = await getTodos();
            response.status(200).json(todos);
            break;
        case 'POST':
            await insertTodo(request.body);
            response.status(200)
            break;
    }
}

