// pages/_app.tsx

import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import { useRouter } from 'next/router'; // Import the useRouter hook
import type { AppProps } from 'next/app';
import '../styles/_app.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter(); // Get access to the router

  return (
    <ChakraProvider>
      {/* Only render the Navbar if the current page is not the homepage */}
      {router.pathname !== '/' && <Navbar />}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
