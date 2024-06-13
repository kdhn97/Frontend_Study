import prisma from "./prisma";

export const getTodos = async () => {
    const todos = await prisma.todo.findMany();
    return todos;
}

export const getTodo = async (id: number) => {
    const todo = await prisma.todo.findUnique({
        where: {
            id
        }
    });
    return todo;
}

export const insertTodo = async(todo) => {
    const insert = await prisma.todo.create({
        data: {
            id: todo.id,
            task: todo.task
        }
    });
}
export const updateTodo = async (id, todo) => {
    const update= await prisma.todo.update({
        where: {
            id
        },
        data: {
            task: todo.task
        }
    });
}

export const deleteTodo = async(id) => {
    const del = await prisma.todo.delete({
        where: {
            id
        }
    });
}

