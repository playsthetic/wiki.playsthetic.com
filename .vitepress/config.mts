import { defineConfig } from "vitepress";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { generateSidebar } from "./sidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Playsthetic",
  description: "Playsthetic's official wiki.",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],

  vite: {
    // Sentry needs these to turn a minified stack trace back into real code.
    build: { sourcemap: true },
    plugins: [
      sentryVitePlugin({
        org: "playsthetic",
        project: "wiki-playsthetic-com",
        // Only needed at build time, to upload source maps. Absent locally, which
        // makes the plugin skip the upload and carry on.
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false,
        sourcemaps: {
          // Send the maps to Sentry, then drop them from the build so the
          // unminified source is not downloadable from the live wiki.
          filesToDeleteAfterUpload: ["./.vitepress/dist/**/*.map"],
        },
      }),
    ],
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/playsthetic/wiki/edit/main/:path",
    },

    sidebar: generateSidebar(),

    socialLinks: [
      {
        icon: "discord",
        link: "https://discord.com/channels/473635736332271626/",
      },
      { icon: "github", link: "https://github.com/playsthetic" },
    ],
  },
});
