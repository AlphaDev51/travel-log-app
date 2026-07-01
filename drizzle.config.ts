import { defineConfig } from "drizzle-kit";
import env from "./lib/env";

const isLocalDb = env.TURSO_DATABASE_URL.startsWith("http://127.0.0.1")
  || env.TURSO_DATABASE_URL.startsWith("http://localhost");

export default defineConfig({
  out: "./src/db/migration",
  schema: "./src/db/schema/index.ts",
  casing: "snake_case",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: isLocalDb ? undefined : env.TURSO_AUTH_TOKEN,
  },
});
