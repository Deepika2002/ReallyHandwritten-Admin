import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps }, }) {

  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
