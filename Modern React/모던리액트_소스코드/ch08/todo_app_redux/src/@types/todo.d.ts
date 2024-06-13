type Todo = {
    id: number,
    task: string
};
type Todos = Todo[];

type TodoServices = {
    get: () => Promise<Todos>,
    insert: (data: Todo) => any,
    update: (id: number, data: Todo) => void, 
    remove: (id: number) => void       
};