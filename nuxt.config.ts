// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
import "./lib/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV !== "production" },

  nitro: {
    preset: "vercel",
    externals: {
      inline: ["better-auth"],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-csurf",
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["node"],
      },
    },
  },

  css: ["./app/assets/css/main.css"],
  vite: {
    optimizeDeps: {
      include: ["@vee-validate/zod", "better-auth/client", "drizzle-orm", "drizzle-orm/sqlite-core", "maplibre-gl", "drizzle-zod", "zod"],
    },
    plugins: [tailwindcss()],
  },

  colorMode: {
    dataValue: "theme",
  },
});
