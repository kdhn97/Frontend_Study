type Todo = {
    id: number,
    task: string
};
type Todos = Todo[];

type TodoServices = {
    get: () => Promise<Todos>,
    insert: (data: Todo) => any,
    update: (id: number, data: Todo) => any, 
    remove: (id: number) => any       
};