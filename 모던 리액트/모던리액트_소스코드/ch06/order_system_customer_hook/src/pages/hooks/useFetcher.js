import { useEffect, useReducer } from 'react';
import {reducer} from './reducers/reducer';
import actions from './reducers/action';

const useFetcher = (url) => {
    const [state, dispatch] = useReducer(reducer, []);
    useEffect(() => {
        actions.get(url, dispatch);
      }, []);
    return [state, actions];  
}
export default useFetcher;