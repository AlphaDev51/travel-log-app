// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../src/db/index";
import * as schema from "../src/db/schema";
import env from "./env";

const siteUrl = process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const auth = betterAuth({
  baseURL: siteUrl,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  advanced: {
    database: {
      generateId: false,
    },
    disableDynamicOrigin: true,
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
});
