import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Image Resizer Test</title>
        <meta name="description" content="Image Resizer Test" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </>
  );
}
