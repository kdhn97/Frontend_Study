import { useState } from 'react';
import SuspenseComponent from './Suspense';

const CallSuspense = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(prev => !prev);
    }
    return (
        <>
            <h3>서스펜스 호출</h3>
            <button onClick={handleClick}>
                {show ? '감추기' : '보이기'}
            </button>
            {show &&  <SuspenseComponent/>}
        </>
    )
}

export default CallSuspense;