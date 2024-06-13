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