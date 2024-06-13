export const reducer = (state, action) => {
    switch(action.type) {  
        case "GET":
            return [...action.payload];
        case "INSERT":
            return [
                ...state, action.payload.todo
            ];
        case "UPDATE":
            state = state.filter(todo => todo.id != action.payload.id);
            return [...state, action.payload.todo];
        case "DELETE":
            state = state.filter(todo => todo.id != action.payload.id);
            return state;            
    }
}