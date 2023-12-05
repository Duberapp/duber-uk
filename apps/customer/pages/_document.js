import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <Script>
          {typeof window !== "undefined" &&
            (function (w, r) {
              w._rwq = r;
              w[r] =
                w[r] ||
                function () {
                  (w[r].q = w[r].q || []).push(arguments);
                };
            })(window, "rewardful")}
        </Script> */}
        <Script
          async
          src="https://r.wdfl.co/rw.js"
          data-rewardful="30fdbc"
          strategy="afterInteractive"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
