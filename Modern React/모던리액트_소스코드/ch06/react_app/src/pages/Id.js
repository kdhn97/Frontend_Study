import { useId } from 'react'
const IdComponent = () => {
  const id = useId('user')
  return (
    <>
        <h3>useId() 훅</h3>
        <div id={id}>안녕 {id}번!</div>
    </>
  )
}
export default IdComponent;