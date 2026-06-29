import { relations } from "drizzle-orm";
import { index, int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: "boolean" }).default(false).notNull(),
  createdAt: integer().notNull(),
  updatedAt: integer().notNull(),
});

export const session = sqliteTable(
  "session",
  {
    id: int().primaryKey({ autoIncrement: true }),
    expiresAt: integer().notNull(),
    token: text().notNull().unique(),
    createdAt: integer().notNull(),
    updatedAt: integer().notNull(),
    userId: integer() // Corrigé ici en integer pour correspondre à user.id
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  table => [index("session_userId_idx").on(table.userId)],
);

export const account = sqliteTable(
  "account",
  {
    id: int().primaryKey({ autoIncrement: true }),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: integer() // Corrigé ici en integer pour correspondre à user.id
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: integer(),
    refreshTokenExpiresAt: integer(),
    scope: text(),
    password: text(),
    createdAt: integer().notNull(),
    updatedAt: integer().notNull(),
  },
  table => [index("account_userId_idx").on(table.userId)],
);

// --- RELATIONS DRIZZLE ---
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));
