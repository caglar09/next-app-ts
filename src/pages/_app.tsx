import AbortController from "abort-controller";
import { wrapper } from "@/store";

import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { fetch, Headers, Request, Response } from "cross-fetch";

Object.assign(globalThis, {
  fetch: fetch,
  Headers: Headers,
  Request: Request,
  Response: Response,
  AbortController: AbortController,
});

export const getInitialProps = async ({ Component, ctx }: AppContext) => {
  // ctx.store.dispatch({ type: "APP", payload: "was set in _app" });

  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      // Some custom thing for all pages
      appProp: ctx.pathname,
    },
  };
};

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
