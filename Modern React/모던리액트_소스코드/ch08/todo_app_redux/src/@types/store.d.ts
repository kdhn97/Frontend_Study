type Get = {
    data: Todos
}
type Insert = {
    data: Todo
}
type Update = {
    id: number,
    data: Todo
};
type Remove = {
    id: number
};
type TodoActions = {
    insertTodo: (todo: Todo) => {
        type: string;
        payload: {
            data: Todo;
        }
    },
    updateTodo: (id: number, todo: Todo) => {
        type: string;
        payload: {
            id: number;
            data: Todo;
        }
    },
    removeTodo: (id: number) => {
        type: string;
        payload: {
            id: number;
        }
    }
};
type TodoActions = {
    insertTodo: (todo: Todo) => {
        type: string;
        payload: {
            data: Todo;
        }
    },
    updateTodo: (id: number, todo: Todo) => {
        type: string;
        payload: {
            id: number;
            data: Todo;
        }
    },
    removeTodo: (id: number) => {
        type: string;
        payload: {
            id: number;
        }
    }
};type TodoActions = {
    insertTodo: (todo: Todo) => {
        type: string;
        payload: {
            data: Todo;
        }
    },
    updateTodo: (id: number, todo: Todo) => {
        type: string;
        payload: {
            id: number;
            data: Todo;
        }
    },
    removeTodo: (id: number) => {
        type: string;
        payload: {
            id: number;
        }
    }
};type TodoActions = {
    insertTodo: (todo: Todo) => {
        type: string;
        payload: {
            data: Todo;
        }
    },
    updateTodo: (id: number, todo: Todo) => {
        type: string;
        payload: {
            id: number;
            data: Todo;
        }
    },
    removeTodo: (id: number) => {
        type: string;
        payload: {
            id: number;
        }
    }
};
