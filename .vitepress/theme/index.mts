import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import * as Sentry from '@sentry/vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // VitePress renders every page on the server at build time, so guard this or
    // the build itself reports errors as if they came from a reader's browser.
    if (import.meta.env.SSR) return;

    Sentry.init({
      app,
      dsn: 'https://02112129252910627ebb87cbc73d04ef@o453802.ingest.us.sentry.io/4512084982497280',

      // Errors only. No performance tracing and no session replay.
      tracesSampleRate: 0,

      // Everything here is a deliberate departure from the defaults, which
      // collect a good deal more than an error report needs.
      dataCollection: {
        userInfo: false,
        cookies: false,
        httpHeaders: { request: false, response: false },
        httpBodies: [],
        urlQueryParams: false,
        // Locals in scope at the point of an error can hold whatever a reader
        // typed, the wiki search box included, so reports keep to frames and
        // line numbers.
        stackFrameVariables: false,
      },
    });
  },
} satisfies Theme;
