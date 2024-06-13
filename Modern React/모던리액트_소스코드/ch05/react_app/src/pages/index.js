import { useState } from 'react';
// import Counter from "./Counter"
import Alarm from "./Alarm";
import List from "./List";
import Root from './Root2';
import TestContext from './TestContext';
import MultiStates from './MultiStates'
// import Counter from './reducer';
import Todo from './reducer3';
export default function Home() {
  const [effect, setEffect] = useState(false);
  const items = [6, 1, 7, 2, 8, 3, 9, 4, 0, 5];
  const [max, setMax] = useState(6);
  const handleChange = (e) => {
    setMax(e.target.value);
  }
  return (
    <>
      {/* {effect && <Counter setEffect={setEffect}/>}
      {effect || <button onClick={() => { setEffect(true)}}>카운터 시작</button> }
      <Alarm/> */}
      {/* <div>
        <label htmlFor="maxItem">항목 개수</label>
        <input type="number" id="maxItem" onChange={handleChange} value={max}/>
      </div>
      <List items={items} max={max}/> */}
      {/* <Root /> */}
      {/* <TestContext/> */}
      {/* <Counter/> */}
      {/* <MultiStates/> */}
      <Todo/>
    </>
  )
}
