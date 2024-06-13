import { Suspense } from 'react';
import TodoComponent from './Todo';
import fetchSuspender from './components/fetchSuspender';
import Spinner from './components/Spinner';
const url = 'http://localhost:8000/api/v1/todos'
const SuspenseComponent = () => {
    return (
        <>
            <h4>서스펜스</h4>
            <Suspense fallback={<Spinner/>}>
                <ol>
                    <TodoComponent todos={fetchSuspender(url, 1000)}/>
                </ol>
            </Suspense>
        </>
    );
}
export default SuspenseComponent;