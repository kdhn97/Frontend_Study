type Action = 
    | {type: "GET", payload: any}
    | {type: "INSERT", payload: {data: any}} 
    | {type: "UPDATE", payload: {id: number, data: any}}
    | {type: "DELETE", payload: {id: number}};
type Actions = {
    get: (url: string, dispatch: Dispatch<ActionType>) => Promise<void>,
    insert: (url: string, dispatch: Dispatch<ActionType>) => void,
    update: (id: number, url: string, dispatch: Dispatch<ActionType>) => void, 
    remove: (id: number, dispatch: Dispatch<ActionType>) => void       
}