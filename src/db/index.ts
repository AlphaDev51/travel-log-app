import { drizzle } from "drizzle-orm/libsql";
import env from "../../lib/env";
import * as schema from "./schema";

const isLocalDb = env.TURSO_DATABASE_URL.startsWith("http://127.0.0.1")
  || env.TURSO_DATABASE_URL.startsWith("http://localhost");

const db = drizzle({
  connection: {

    url: env.TURSO_DATABASE_URL,
    authToken: isLocalDb ? undefined : env.TURSO_AUTH_TOKEN,

  },
  schema,
  casing: "snake_case",
});

export default db;
