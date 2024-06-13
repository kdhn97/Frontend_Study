import '@/styles/globals.css'
import {useEffect, useState} from 'react';

function App({ Component, pageProps }) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? <Component {...pageProps} /> : null;
  // if (typeof window === 'undefined') return null;
  // return <Component {...pageProps} />
}
export default App;

