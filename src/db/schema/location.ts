import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./auth";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => [
  unique().on(t.name, t.userId),
]);

export const InsertLocation = createInsertSchema(location, {

  name: (_field: any) => z.string({ message: "Required" })
    .min(1, "Location name is required")
    .max(100),

  description: (field: any) => field.max(1000).optional(),

  lat: (_field: any) => z.coerce.number({ message: "Required" })
    .min(-90, "Latitude cannot be less than -90")
    .max(90, "Latitude cannot be greater than 90"),

  long: (_field: any) => z.coerce.number({ message: "Required" })
    .min(-180, "Longitude cannot be less than -180")
    .max(180, "Longitude cannot be greater than 180"),

}).omit({
  id: true,
  userId: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLocation = z.infer<typeof InsertLocation>;
