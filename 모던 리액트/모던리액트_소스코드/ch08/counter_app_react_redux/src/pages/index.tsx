import { Provider } from 'react-redux';
import store from './store/store';
import Counter from './counter';
export default function Home() {
  return (
    <Provider store={store}>
      <Counter/>
    </Provider>
  )
}