import TodoList from "./TodoList"
export default function Home() {
  return (
    <main style={
        { margin: '16px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
        <h1>할 일 관리</h1>
        <TodoList />
    </main>
  )
}
