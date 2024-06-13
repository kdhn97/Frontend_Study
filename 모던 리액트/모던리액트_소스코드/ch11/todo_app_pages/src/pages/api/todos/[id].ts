import type { NextApiRequest, NextApiResponse } from 'next'
import todo_db from '@/lib/todos';

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function handler(request: NextApiRequest, 
                                      response: NextApiResponse) {
    const id = Number(request.query.id);
    switch(request.method) {
        case 'GET': {
            const index = todo_db.todos.findIndex(
                    (todo) => todo.id == id);
            response.status(200).json(todo_db.todos[index]);
            break;
        }
        case "PUT": {
            const index = todo_db.todos.findIndex(
                    (todo) => todo.id == id);
            if(index != -1) {
                todo_db.todos[index] = request.body;
                response.status(200);
            }
            break;
        }
        case "DELETE":
            todo_db.todos = todo_db.todos.filter(
                    (todo) => todo.id != id);     
            response.status(200);
            break;
    }
}

