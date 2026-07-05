import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../src/db/index"; // Ton instance Drizzle
import * as schema from "../src/db/schema";
import env from "./env";

export const auth = betterAuth({
  // 🌟 Plus de hook "after" ou de "createAuthMiddleware" ici,
  // Better-Auth gère nativement le retour de /get-session
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
});
