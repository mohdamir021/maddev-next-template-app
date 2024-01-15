import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // OPTIONAL
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Pcari | Central Admin Dashboard</title>
        <meta
          name="description"
          content="An admin dashboard for Pcari Central"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </>
  );
}
