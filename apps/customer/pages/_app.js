import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import "../styles/datepicker-desktop.css";
import "../styles/datepicker-mobile.css";
import "../styles/transition-group.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Head from "next/head";
import { clarity } from "react-microsoft-clarity";
import Script from "next/script";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabaseCustomerClient } from "../config/supabaseClient";
import { UserbackProvider } from "@userback/react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    clarity.init("exs6x76y2p");
  });

  return (
    <UserbackProvider token="41876|85155|2rU2u7oSxw0CvoNIEHe3TxR3C">
      <SessionContextProvider
        supabaseClient={supabaseCustomerClient}
        initialSession={pageProps.initialSession}
      >
        <Provider store={store}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Duber | UK&apos;s Trusted Drone Pilot Hire App</title>
            <meta
              name="description"
              content="Looking to hire a professional drone pilot? Dubers is the leading app for finding and hiring certified drone pilots for your project. Get started today!"
            />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="en" />

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#2b5797" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GBTJ1FX27E');
        `}
          </Script>

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-11044416135"
            strategy="afterInteractive"
          />
          <Script id="google-tagmanager" strategy="afterInteractive">
            {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11044416135');
  `}
          </Script>

          <Component {...pageProps} />
        </Provider>
      </SessionContextProvider>
    </UserbackProvider>
  );
}

export default MyApp;
