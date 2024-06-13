export const reducer = (state, action) => {
    switch(action.type) {  
        case "GET":
            return [...action.payload];
        case "INSERT":
            return [
                ...state, action.payload.customer
            ];
        case "UPDATE":
            state = state.filter(customer => customer.id != action.payload.id);
            return [...state, action.payload.customer];
        case "DELETE":
            state = state.filter(customer => customer.id != action.payload.id);
            return state;            
    }
}