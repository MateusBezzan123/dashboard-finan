import { FiltersProvider } from '../context/FiltersContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FiltersProvider>
      <Component {...pageProps} />
    </FiltersProvider>
  );
}