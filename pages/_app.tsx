import { AppProps } from 'next/app';
import { wrapper } from '../src/redux/store';

import '../styles/main.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
  
}

export default wrapper.withRedux(MyApp);