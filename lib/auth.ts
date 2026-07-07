// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../src/db/index";
import * as schema from "../src/db/schema";
import env from "./env";

export const auth = betterAuth({
  // 🌟 Ajout de l'URL de base pour valider l'Origin en production
  baseURL: process.env.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  advanced: {
    database: {
      generateId: false,
    },
    crossSubDomainCookie: {
      enabled: true,
    },
  },
  trustedOrigins: [
    "https://travel-log-app-coral.vercel.app",
  ],
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
});
