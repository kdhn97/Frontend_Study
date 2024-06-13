import type { NextApiRequest, NextApiResponse } from 'next'
import todo_db from '@/lib/todos';

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function handler(request: NextApiRequest, 
                                      response: NextApiResponse) {
  switch(request.method) {
    case 'GET':
      response.status(200).json(todo_db.todos);
      break;
    case 'POST':
      const todo = request.body;
      todo_db.todos.push(todo);
      response.status(200);
      break;
  }
}

