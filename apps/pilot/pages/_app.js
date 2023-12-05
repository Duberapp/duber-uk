import React, { useEffect } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Head from "next/head";
// import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabaseClient from "../config/supabaseClient";
import { UserbackProvider } from "@userback/react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use();
  }, []);

  const userBackToken = "41876|85154|2rU2u7oSxw0CvoNIEHe3TxR3C";

  return (
    <UserbackProvider token={userBackToken}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Provider store={store}>
          <Head>
            <title>Duber - Drone Pilot App</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            ></meta>
          </Head>
          <Component {...pageProps} />
        </Provider>
      </SessionContextProvider>
    </UserbackProvider>
  );
}

export default MyApp;
