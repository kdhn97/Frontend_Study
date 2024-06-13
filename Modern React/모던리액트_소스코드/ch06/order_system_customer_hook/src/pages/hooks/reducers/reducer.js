export const reducer = (state, action) => {
    switch(action.type) {  
        case "GET":
            return [...action.payload];
        case "INSERT":
            return [
                ...state, action.payload.data
            ];
        case "UPDATE":
            state = state.filter(data => data.id != action.payload.id);
            return [...state, action.payload.data];
        case "DELETE":
            state = state.filter(data => data.id != action.payload.id);
            return state;            
    }
}